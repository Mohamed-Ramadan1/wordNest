// Express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { AppError, catchAsync } from "@shared/index";

import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";
import {
  BandAccountsBody,
  BandAccountsParams,
} from "../../interfaces/bandAccountsBody.interface";

export class BanUserAccountMiddleware {
  // validate before ban user account
  static validateBanUserAccount = catchAsync(
    async (
      req: Request<BandAccountsParams, {}, BandAccountsBody>,
      res: Response,
      next: NextFunction
    ) => {
      const userId = req.params.userId;
      const { banAccountReason, banAccountDaysNumber } = req.body;

      if (!banAccountDaysNumber || !banAccountReason) {
        return next(
          new AppError("Ban account reason and days number are required", 400)
        );
      }
      const userToBanned: IUser | null = await UserModel.findById(userId);
      if (!userToBanned) {
        return next(new AppError("User you want to ban not existing", 404));
      }

      if (userToBanned.isAccountBanned) {
        return next(new AppError("User account is already banned", 400));
      }
      req.body.accountToBeBanned = userToBanned;

      next();
    }
  );

  // validate before un-ban user account
  static validateUnBanUserAccount = catchAsync(
    async (
      req: Request<BandAccountsParams, {}, BandAccountsBody>,
      res: Response,
      next: NextFunction
    ) => {
      const userId = req.params.userId;
      const { adminUnbanComment } = req.body;

      if (!adminUnbanComment || adminUnbanComment.trim() === "") {
        return next(new AppError("Admin unban comment is required", 400));
      }

      const userToUnBanned: IUser | null = await UserModel.findById(userId);
      if (!userToUnBanned) {
        return next(new AppError("User you want to un-ban not existing", 404));
      }

      if (!userToUnBanned.isAccountBanned) {
        return next(new AppError("User account is already un-banned", 400));
      }
      req.body.accountToBeUnbaned = userToUnBanned;
      next();
    }
  );
}
