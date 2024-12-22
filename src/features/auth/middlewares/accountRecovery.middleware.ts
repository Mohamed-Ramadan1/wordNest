// modules / packages imports.
import { NextFunction, Request, Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

// dto imports
import { ResetPasswordDTO } from "@features/auth/dtos/resetPassword.dto";

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
  static validateResendEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const MAX_ATTEMPTS = 4;
      const TIME_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
      const now = Date.now(); // Current timestamp

      // Check if the user's email is already verified
      if (req.user && req.user.emailVerified) {
        throw new AppError("Email is already verified", 400);
      }

      // Validate resend attempts
      if (req.user) {
        const { resendVerificationTokenCount, lastVerificationEmailSentAt } =
          req.user;

        // Ensure lastVerificationEmailSentAt exists and calculate time difference
        const lastAttemptTime = lastVerificationEmailSentAt?.getTime() || 0;
        const timeSinceLastAttempt = now - lastAttemptTime;

        if (
          resendVerificationTokenCount >= MAX_ATTEMPTS &&
          timeSinceLastAttempt < TIME_WINDOW_MS
        ) {
          throw new AppError(
            `You can only request a verification email ${MAX_ATTEMPTS} times every 4 hours.`,
            429 // HTTP Status Code for Too Many Requests
          );
        }

        // Reset the count if the time window has passed
        if (timeSinceLastAttempt >= TIME_WINDOW_MS) {
          req.user.resendVerificationTokenCount = 0; // Reset attempt counter
        }
      }

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
        throw new AppError(
          "No account found with associated with this email please check the email address and tray again.",
          404
        );
      }

      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Define 24 hours in milliseconds
      const now = new Date().getTime(); // Current timestamp
      const lastAttempt = new Date(
        user.passwordLastResetRequestAttemptDate
      ).getTime();

      // Reset attempts if 1 or fewer attempts were made and 24 hours have passed since the last attempt
      if (
        user.passwordResetRequestsAttempts <= 1 &&
        user.passwordLastResetRequestAttemptDate &&
        now - lastAttempt >= oneDayInMilliseconds
      ) {
        user.passwordResetRequestsAttempts = 0;
      }

      // Restrict if 2 or more attempts were made within the last 24 hours
      if (
        user.passwordResetRequestsAttempts >= 2 &&
        user.passwordLastResetRequestAttemptDate &&
        now - lastAttempt < oneDayInMilliseconds
      ) {
        throw new AppError(
          "You can only request a password reset twice within 24 hours.",
          429 // HTTP Status Code for Too Many Requests
        );
      }

      req.user = user;
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
