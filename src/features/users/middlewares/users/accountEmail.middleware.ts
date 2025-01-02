import { NextFunction, Request, Response } from "express";
import { catchAsync } from "@utils/catchAsync";
import { AppError } from "@utils/appError";
import { IUser } from "@features/users/interfaces/user.interface";
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
      next();
    }
  );

  /**
   * Validates the new email ownership verification request.
   */
  static validateVerifyNewEmailOwnership = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      next();
    }
  );
  /**
   * Validates the resend email verification token request.
   */
  static validateResendNewEmailVerificationToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      next();
    }
  );
}
