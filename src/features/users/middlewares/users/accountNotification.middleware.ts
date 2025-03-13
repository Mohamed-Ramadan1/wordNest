// Express imports
import { NextFunction, Request, Response } from "express";

//packages imports
import { injectable } from "inversify";

// shard imports
import { AppError, catchAsync } from "@shared/index";

// interfaces imports
import { IAccountNotificationMiddleware } from "../../interfaces/index";

@injectable()
export class AccountNotificationMiddleware
  implements IAccountNotificationMiddleware
{
  public validateEnableAccountNotifications = catchAsync(
    (req: Request, res: Response, next: NextFunction): void => {
      const user = req.user;
      if (user.notificationsEnabled ) {
        throw new AppError(
          "Your account notifications are already enabled.",
          400
        );
      }

      next();
    }
  );

  public validateDisableAccountNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const user = req.user;
    if (!user.notificationsEnabled) {
      throw new AppError(
        "Your account notifications are already disabled.",
        400
      );
    }
    next();
  }
}
