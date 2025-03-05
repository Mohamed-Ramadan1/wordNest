import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { IUser } from "@features/users_feature/interfaces/user.interface";
import UserModel from "@features/users_feature/models/user.model";

const MAX_DEACTIVATION_REQUESTS: number = 4;
const COOLDOWN_PERIOD: number = 48 * 60 * 60 * 1000;
// const COOLDOWN_PERIOD :number= 1 * 60 * 1000; // 1 minute in milliseconds

export class AccountStatusMiddleware {
  // validate deactivate account request
  static validateDeactivateAccountRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IUser;

      if (!user.isActive) {
        throw new AppError("Account is already deactivated", 400);
      }

      const hasExceededRequests =
        user.deactivationRequestCount >= MAX_DEACTIVATION_REQUESTS &&
        user.lastDeactivationRequestAt &&
        Date.now() - user.lastDeactivationRequestAt.getTime() < COOLDOWN_PERIOD;

      if (hasExceededRequests) {
        throw new AppError(
          "You have exceeded the maximum number of deactivation requests. Please try again after 48 hours.",
          400
        );
      }

      const canResetRequests =
        user.deactivationRequestCount >= MAX_DEACTIVATION_REQUESTS &&
        user.lastDeactivationRequestAt &&
        Date.now() - user.lastDeactivationRequestAt.getTime() > COOLDOWN_PERIOD;

      if (canResetRequests) {
        user.lastDeactivationRequestAt = undefined;
        user.deactivationRequestCount = 0;
        user.deactivationAccountToken = undefined;
        user.deactivationAccountTokenExpiredAt = undefined;
      }

      next();
    }
  );

  // validate deactivate account confirmation
  static validateDeactivateAccountConfirmation = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // get the user
      const user: IUser | null = await UserModel.findOne({
        deactivationAccountToken: req.params.token,
        deactivationAccountTokenExpiredAt: { $gt: Date.now() },
      });
      // check if the user is active or not
      if (!user) {
        throw new AppError("Invalid or expired deactivation token", 400);
      }

      // add the user to the request to be used in the service and controller
      req.user = user;

      next();
    }
  );

  // validate activation account confirmation
  static validateActivateAccount = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // get the user
      const user: IUser | null = await UserModel.findOne({
        reactivationAccountToken: req.params.token,
        reactivationAccountTokenExpiredAt: { $gt: Date.now() },
      });
      // check if the user is active or not
      if (!user) {
        throw new AppError("Invalid or expired reactivation token", 400);
      }

      // add the user to the request to be used in the service and controller
      req.user = user;
      next();
    }
  );
}
