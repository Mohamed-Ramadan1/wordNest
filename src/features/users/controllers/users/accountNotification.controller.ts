// system imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import { IAccountNotificationService } from "../../interfaces/index";
// Shard imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

import { ObjectId } from "mongoose";

@injectable()
export class AccountNotificationController {
  private accountNotificationService: IAccountNotificationService;
  constructor(
    @inject(TYPES.AccountNotificationService)
    accountNotificationService: IAccountNotificationService
  ) {
    this.accountNotificationService = accountNotificationService;
  }
  /**
   * Enables notifications for the user's account.
   * This includes email, SMS, or other notification preferences.
   */

  public enableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountNotificationService.enableNotifications(
        req.user?._id as ObjectId
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Notifications enabled successfully",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Disables notifications for the user's account.
   * Allows the user to opt out of receiving account-related notifications.
   */

  public disableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountNotificationService.disableNotifications(
        req.user?._id as ObjectId
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Notifications disabled successfully.",
      };
      sendResponse(200, res, response);
    }
  );
}
