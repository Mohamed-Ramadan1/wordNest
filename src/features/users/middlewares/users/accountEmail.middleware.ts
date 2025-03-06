import { NextFunction, Request, Response } from "express";
import { catchAsync, AppError } from "@shared/index";

import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";
import {
  validateNewEmail,
  checkIfEmailExists,
  handleCooldownAndReset,
  enforceEmailChangeLimit,
} from "@features/users/helpers/accountEmail.helper";
export class AccountEmailMiddleware {
  /**
   * Validates the email change request.
   */
  static validateChangeEmailRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IUser;
      const { newEmail } = req.body;

      if (!newEmail) {
        return next(new AppError("New email is required.", 400));
      }

      try {
        validateNewEmail(user, newEmail);
        await checkIfEmailExists(newEmail);
        await handleCooldownAndReset(user);
        enforceEmailChangeLimit(user);

        next();
      } catch (error) {
        next(error);
      }
    }
  );
  /**
   * Validates the email change confirmation request.
   */
  static validateConfirmEmailChange = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: IUser | null = await UserModel.findOne({
        changeEmailRequestToken: req.params.token,
        changeEmailVerificationTokenExpiresAt: { $gt: Date.now() },
      });
      console.log(req.params.token);
      if (!user) {
        throw new AppError("Invalid or expired change email token", 400);
      }
      req.user = user;
      next();
    }
  );

  /**
   * Validates the new email ownership verification request.
   */
  static validateVerifyNewEmailOwnership = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: IUser | null = await UserModel.findOne({
        tempChangeEmailVerificationToken: req.params.token,
        tempChangedEmailVerificationTokenExpiresAt: { $gt: Date.now() },
      });
      if (!user) {
        throw new AppError("Invalid or expired temp change email token", 400);
      }
      req.user = user;
      next();
    }
  );
  /**
   * Validates the resend email verification token request.
   */
  static validateResendNewEmailVerificationToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IUser;
      const {
        tempChangedEmailVerificationTokenCount,
        lastTempChangedEmailVerificationTokenSentAt,
      } = user;

      if (user.isChangeEmailRequestConfirmed == false) {
        throw new AppError(
          "Please confirm the email change request first to be able to continue",
          400
        );
      }
      if (!user.tempChangedEmail) {
        throw new AppError("No email to resend verification token to", 400);
      }

      const maxAttempts = 5;
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (tempChangedEmailVerificationTokenCount >= maxAttempts) {
        const now = Date.now();
        const lastAttemptTime = new Date(
          lastTempChangedEmailVerificationTokenSentAt!
        ).getTime();

        if (now - lastAttemptTime < cooldownPeriod) {
          throw new AppError("Too many attempts. Please wait 24 hours.", 429);
        } else {
          // Reset the count and last attempt time since cooldown has passed
          user.tempChangedEmailVerificationTokenCount = 0;
          user.lastTempChangedEmailVerificationTokenSentAt = undefined;
          await user.save(); // Ensure changes are saved to the database
        }
      }

      next();
    }
  );
}
