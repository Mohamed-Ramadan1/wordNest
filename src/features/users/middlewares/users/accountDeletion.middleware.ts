// express imports
import { NextFunction, Request, Response } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

import {
  IUser,
  IAccountDeletionMiddleware,
  IUserAuthRepository,
  AccountDeletionRequestParams,
} from "../../interfaces/index";

const MAX_DELETEA_ACCOUNT_REQUESTS: number = 5;
const COOLDOWN_PERIOD: number = 24 * 60 * 60 * 1000;
// const COOLDOWN_PERIOD: number = 1 * 60 * 1000; // 1 minute in milliseconds

@injectable()
export class AccountDeletionMiddleware implements IAccountDeletionMiddleware {
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository
  ) {}
  // Account Deletion
  public validateRequestAccountDeletion = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;
      const hasExceededRequests =
        user.deleteAccountRequestCount &&
        user.deleteAccountRequestCount >= MAX_DELETEA_ACCOUNT_REQUESTS &&
        user.lastDeleteAccountRequestAt &&
        Date.now() - user.lastDeleteAccountRequestAt.getTime() <
          COOLDOWN_PERIOD;

      if (hasExceededRequests) {
        throw new AppError(
          "You have exceeded the maximum number of account deletion requests. Please try again after 24 hours.",
          400
        );
      }
      const canResetRequests =
        user.deleteAccountRequestCount &&
        user.deleteAccountRequestCount >= MAX_DELETEA_ACCOUNT_REQUESTS &&
        user.lastDeleteAccountRequestAt &&
        Date.now() - user.lastDeleteAccountRequestAt.getTime() >
          COOLDOWN_PERIOD;

      if (canResetRequests) {
        user.lastDeleteAccountRequestAt = undefined;
        user.deleteAccountRequestCount = 0;
        user.deleteAccountConfirmedAt = new Date();
        user.deleteAccountRequestToken = undefined;
      }

      next();
    }
  );

  public validateConfirmAccountDeletion = catchAsync(
    async (
      req: Request<AccountDeletionRequestParams>,
      res: Response,
      next: NextFunction
    ) => {
      // Logic to confirm account deletion
      const { token } = req.params;

      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          {
            attribute: "deleteAccountRequestToken",
            value: token,
          },
          {
            attribute: "deleteAccountRequestTokenExpiredAt",
            value: new Date(),
            operator: "$gt",
          },
        ]);
      if (!user) {
        throw new AppError("Invalid or expired delete account token", 400);
      }
      req.user = user;
      next();
    }
  );
}
