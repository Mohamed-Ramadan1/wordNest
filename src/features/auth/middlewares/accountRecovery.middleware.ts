// modules / packages imports.
import { NextFunction, Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// utils imports
import { catchAsync, TYPES, validateDto, IErrorUtils } from "@shared/index";

// dto imports
import { ResetPasswordDTO } from "@features/auth/dtos/resetPassword.dto";

// interfaces imports
import { IAccountRecoveryMiddleware } from "../interfaces/index";

// interfaces imports
import { IUserAuthRepository } from "@features/users/interfaces";

// helpers imports
import {
  checkResendVerificationEmailAttempts,
  checkResetPasswordAttempts,
} from "../helper/accountRecovery.helper";

@injectable()
export class AccountRecoveryMiddleware implements IAccountRecoveryMiddleware {
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  // validation middleware for validate the verify email token to the user.
  public validateVerifyEmails = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      // find the user who have the token and its not expired.
      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          { attribute: "emailVerificationToken", value: req.params.token },
          {
            attribute: "emailVerificationExpires",
            value: new Date(),
            operator: "$gt",
          },
        ]);

      if (!user) {
        return this.errorUtils.handleAppError(
          "Token is invalid or has expired",
          400
        );
      }
      req.user = user;
      next();
    }
  );

  // validation middleware for validate the resend verification email to the user.
  public validateResendVerificationEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user's email is already verified
      if (req.user.emailVerified) {
        return this.errorUtils.handleAppError("Email is already verified", 400);
      }

      // Validate resend attempts
      await checkResendVerificationEmailAttempts(req.user);

      next();
    }
  );

  // validation middleware for validate the reset password request.
  public validateRequestResetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.body.email) {
        return this.errorUtils.handleAppError("Email is required", 400);
      }
      // find the user who have the email.
      const user: IUser | null = await this.userAuthRepository.findUserByEmail(
        req.body.email
      );
      if (!user) {
        return res.status(200).json({
          message:
            "If an account with this email exists, a password reset email will be sent.",
        });
      }

      await checkResetPasswordAttempts(user);
      req.user = user;

      next();
    }
  );

  // validation middleware for validate the reset password process (token and user info).
  public validateResetPassword = [
    validateDto(ResetPasswordDTO),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // First check if token exists
      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          { attribute: "passwordResetToken", value: req.params.token },
        ]);

      if (!user) {
        return this.errorUtils.handleAppError(
          "Token is invalid or has expired",
          400
        );
      }

      // Then check if token is expired
      if (user.passwordResetTokenExpiredAt < new Date()) {
        return this.errorUtils.handleAppError(
          "Token is invalid or has expired",
          400
        );
      }

      req.user = user;
      next();
    }),
  ] as [
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>,
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>,
  ];
}
