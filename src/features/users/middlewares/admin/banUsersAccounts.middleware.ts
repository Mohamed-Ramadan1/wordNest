//packages imports
import { inject, injectable } from "inversify";

// Express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

import {
  IUser,
  BandAccountsBody,
  BandAccountsParams,
  IBanUserAccountMiddleware,
  IUserManagementRepository,
} from "../../interfaces/index";

@injectable()
export class BanUserAccountMiddleware implements IBanUserAccountMiddleware {
  constructor(
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository
  ) {}
  // validate before ban user account
  public validateBanUserAccount = catchAsync(
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
      const userToBanned: IUser =
        await this.userManagementRepository.getUserById(userId);

      if (userToBanned.isAccountBanned) {
        return next(new AppError("User account is already banned", 400));
      }
      req.body.accountToBeBanned = userToBanned;

      next();
    }
  );

  // validate before un-ban user account
  public validateUnBanUserAccount = catchAsync(
    async (
      req: Request<BandAccountsParams, {}, BandAccountsBody>,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const userId = req.params.userId;
      const { adminUnbanComment } = req.body;

      if (!adminUnbanComment || adminUnbanComment.trim() === "") {
        return next(new AppError("Admin unban comment is required", 400));
      }

      const userToUnBanned: IUser =
        await this.userManagementRepository.getUserById(userId);

      if (!userToUnBanned.isAccountBanned) {
        return next(new AppError("User account is already un-banned", 400));
      }
      req.body.accountToBeUnbaned = userToUnBanned;
      next();
    }
  );
}
