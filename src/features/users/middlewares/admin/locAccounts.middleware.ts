import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";

import {
  LockAccountBody,
  LockAccountParameters,
} from "@features/users/interfaces/lockAccountBody.interface";
export class LockUserAccountMiddleware {
  // validate lock user account
  static validateLockAccount = catchAsync(
    async (
      req: Request<LockAccountParameters, {}, LockAccountBody>,
      res: Response,
      next: NextFunction
    ) => {
      const userId: string = req.params.userId;
      const { lockReason } = req.body;

      // check if not existing reason
      if (!lockReason || lockReason.trim() === "") {
        return next(new AppError("Lock reason is required", 400));
      }

      // check if not existing user
      const user: IUser | null = await UserModel.findById(userId);
      if (!user) {
        return next(
          new AppError("User you want to lock his account not existing,", 404)
        );
      }

      if (user.isAccountLocked) {
        return next(new AppError("User account is already locked", 400));
      }

      req.body.userAccountToBeLocked = user;
      next();
    }
  );

  // lock user account
  static validateUnlockAccount = catchAsync(
    async (
      req: Request<LockAccountParameters, {}, LockAccountBody>,
      res: Response,
      next: NextFunction
    ) => {
      const userId: string = req.params.userId;
      const { unLockComment } = req.body;
      if (!unLockComment || unLockComment.trim() === "") {
        return next(new AppError("Unlock comment is required", 400));
      }
      // check if not existing user
      const user: IUser | null = await UserModel.findById(userId);
      if (!user) {
        return next(
          new AppError("User you want to unlock his account not existing,", 404)
        );
      }

      if (!user.isAccountLocked) {
        return next(new AppError("User account is not locked", 400));
      }

      req.body.userAccountToBeUnLocked = user;
      req.body.unLockComment = unLockComment;

      next();
    }
  );
}
