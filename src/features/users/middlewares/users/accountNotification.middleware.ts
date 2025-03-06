// Express imports
import { NextFunction, Request, Response } from "express";

// shard imports
import { AppError, catchAsync } from "@shared/index";

export class AccountNotificationMiddleware {
  static validateEnableAccountNotifications = catchAsync(
    (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user || req.user.notificationsEnabled === true) {
        throw new AppError(
          "Your account notifications are already enabled.",
          400
        );
      }
      next();
    }
  );

  static validateDisableAccountNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!req.user || req.user.notificationsEnabled === false) {
      throw new AppError(
        "Your account notifications are already disabled.",
        400
      );
    }
    next();
  }
}
