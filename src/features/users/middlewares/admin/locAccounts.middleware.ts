// express imports
import { NextFunction, Request, Response } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

import {
  IUser,
  LockAccountBody,
  LockAccountParameters,
  ILockUserAccountMiddleware,
  IUserManagementRepository,
} from "../../interfaces/index";

@injectable()
export class LockUserAccountMiddleware implements ILockUserAccountMiddleware {
  constructor(
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository
  ) {}
  // validate lock user account
  public validateLockAccount = catchAsync(
    async (
      req: Request<LockAccountParameters, {}, LockAccountBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { userId } = req.params;
      const { lockReason } = req.body;

      // check if not existing reason
      if (!lockReason || lockReason.trim() === "") {
        return next(new AppError("Lock reason is required", 400));
      }

      // check if not existing user
      const user: IUser =
        await this.userManagementRepository.getUserById(userId);

      if (user.isAccountLocked) {
        return next(new AppError("User account is already locked", 400));
      }

      req.body.userAccountToBeLocked = user;
      next();
    }
  );

  // lock user account
  public validateUnlockAccount = catchAsync(
    async (
      req: Request<LockAccountParameters, {}, LockAccountBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { userId } = req.params;
      const { unLockComment } = req.body;
      if (!unLockComment || unLockComment.trim() === "") {
        return next(new AppError("Unlock comment is required", 400));
      }
      // check if not existing user
      const user: IUser =
        await this.userManagementRepository.getUserById(userId);

      if (!user.isAccountLocked) {
        return next(new AppError("User account is not locked", 400));
      }

      req.body.userAccountToBeUnLocked = user;
      req.body.unLockComment = unLockComment;

      next();
    }
  );
}
