import { AppError, catchAsync } from "@shared/index";

import { NextFunction, Request, Response } from "express";
import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";

const MAX_DELETEA_ACCOUNT_REQUESTS: number = 5;
const COOLDOWN_PERIOD: number = 24 * 60 * 60 * 1000;
// const COOLDOWN_PERIOD: number = 1 * 60 * 1000; // 1 minute in milliseconds
export class AccountDeletionMiddleware {
  // Account Deletion
  static validateRequestAccountDeletion = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IUser;
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

  static validateConfirmAccountDeletion = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Logic to confirm account deletion
      const token: string = req.params.token;
      const user: IUser | null = await UserModel.findOne({
        deleteAccountRequestToken: token,
        deleteAccountRequestTokenExpiredAt: { $gt: Date.now() },
      });
      if (!user) {
        throw new AppError("Invalid or expired delete account token", 400);
      }
      req.user = user;
      next();
    }
  );
}
