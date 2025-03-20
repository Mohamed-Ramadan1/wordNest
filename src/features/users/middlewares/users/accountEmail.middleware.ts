// express imports
import { NextFunction, Request, Response } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

import {
  IUser,
  IAccountEmailMiddleware,
  IUserAuthRepository,
  ValidateChangeEmailRequestBody,
  AccountEmailRequestParams,
} from "../../interfaces/index";

import {
  validateNewEmail,
  checkIfEmailExists,
  handleCooldownAndReset,
  enforceEmailChangeLimit,
} from "../../helpers/accountEmail.helper";

@injectable()
export class AccountEmailMiddleware implements IAccountEmailMiddleware {
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository
  ) {}
  /**
   * Validates the email change request.
   */
  public validateChangeEmailRequest = catchAsync(
    async (
      req: Request<{}, {}, ValidateChangeEmailRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const user = req.user;
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
  public validateConfirmEmailChange = catchAsync(
    async (
      req: Request<AccountEmailRequestParams>,
      res: Response,
      next: NextFunction
    ) => {
      const { token } = req.params;

      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          {
            attribute: "changeEmailRequestToken",
            value: token,
          },
          {
            attribute: "changeEmailVerificationTokenExpiresAt",
            value: new Date(),
            operator: "$gt",
          },
        ]);
      console.log(user);
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
  public validateVerifyNewEmailOwnership = catchAsync(
    async (
      req: Request<AccountEmailRequestParams>,
      res: Response,
      next: NextFunction
    ) => {
      const { token } = req.params;
      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          {
            attribute: "tempChangeEmailVerificationToken",
            value: token,
          },
          {
            attribute: "tempChangedEmailVerificationTokenExpiresAt",
            value: new Date(),
            operator: "$gt",
          },
        ]);

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
  public validateResendNewEmailVerificationToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
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
