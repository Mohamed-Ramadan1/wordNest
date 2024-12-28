// system imports
import { Request, Response } from "express";

// models imports
import UserModel from "../../models/user.model";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";
import { ObjectId } from "mongoose";
import { AccountNotificationService } from "@features/users/services/users/accountNotification.service";

export class AccountNotificationController {
  /**
   * Enables notifications for the user's account.
   * This includes email, SMS, or other notification preferences.
   */

  public enableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {
      await AccountNotificationService.enableNotifications(
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
      await AccountNotificationService.disableNotifications(
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
