// system imports
import { Request, Response } from "express";

// models imports
import UserModel from "../../models/user.model";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// services imports
import UserService from "../../services/users/user.service";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";
import { ObjectId } from "mongoose";

export class AccountNotificationController {
  /**
   * Enables notifications for the user's account.
   * This includes email, SMS, or other notification preferences.
   */
  //! in progress
  public enableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Disables notifications for the user's account.
   * Allows the user to opt out of receiving account-related notifications.
   */
  //! in progress
  public disableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
