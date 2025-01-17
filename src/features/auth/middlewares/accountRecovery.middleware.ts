// modules / packages imports.
import { NextFunction, Request, Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

// dto imports
import { ResetPasswordDTO } from "@features/auth/dtos/resetPassword.dto";

// helpers imports
import {
  checkResendVerificationEmailAttempts,
  checkResetPasswordAttempts,
} from "../helper/accountRecovery.helper";
export class AccountRecoveryMiddleware {
  // validation middleware for validate the verify email token to the user.
  static validateVerifyEMails = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // find the user who have the token and its not expired.
      const user: IUser | null = await UserModel.findOne({
        emailVerificationToken: req.params.token,
        emailVerificationExpires: { $gt: new Date() },
      });

      if (!user) {
        throw new AppError("Token is invalid or has expired", 400);
      }
      req.user = user;
      next();
    }
  );

  // validation middleware for validate the resend verification email to the user.
  static validateResendVerificationEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user's email is already verified
      if (req.user.emailVerified) {
        throw new AppError("Email is already verified", 400);
      }

      // Validate resend attempts
      await checkResendVerificationEmailAttempts(req.user);

      next();
    }
  );

  // validation middleware for validate the reset password request.
  static validateRequestResetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // find the user who have the email.
      const user: IUser | null = await UserModel.findOne({
        email: req.body.email,
      });
      if (!user) {
        res.status(200).json({
          message:
            "If an account with this email exists, a password reset email will be sent.",
        });
      }

      if (user) {
        checkResetPasswordAttempts(user);
        req.user = user;
      }
      next();
    }
  );

  // validation middleware for validate the reset password process (token and user info).
  static validateResetPassword = [
    validateDto(ResetPasswordDTO),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // First check if token exists
      const user: IUser | null = await UserModel.findOne({
        passwordResetToken: req.params.token,
      });

      if (!user) {
        throw new AppError("Invalid reset token", 400);
      }

      // Then check if token is expired
      if (user.passwordResetTokenExpiredAt < new Date()) {
        throw new AppError("Reset token has expired", 400);
      }

      req.user = user;
      next();
    }),
  ];
}
