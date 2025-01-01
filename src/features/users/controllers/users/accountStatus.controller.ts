// express imports
import { Request, Response } from "express";

// mongoose imports
import { ObjectId } from "mongoose";

// models imports
import UserModel from "../../models/user.model";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// services imports
import { AccountStatusService } from "../../services/users/accountStatus.service";

export class AccountStatusController {
  /**
   * Deactivates the user's account.
   * Temporarily disables the account, preventing access and activity.
   */
  public deactivateAccountRequest = catchAsync(
    async (req: Request, res: Response) => {
      await AccountStatusService.deactivateAccountReq(
        req.user as IUser,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Account deactivated requested successfully please check your email for completed the deactivation process.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   *  Confirms the deactivation of the user's account.
   */
  public deactivateAccountConfirmation = catchAsync(
    async (req: Request, res: Response) => {
      await AccountStatusService.deactivateAccountConfirmation(
        req.user as IUser,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Account deactivated successfully.",
      };
      sendResponse(200, res, response);
    }
  );
  /**
   * Activates the user's account.
   * This may be used to enable the account after it has been deactivated or suspended.
   */

  public activateAccount = catchAsync(async (req: Request, res: Response) => {
    await AccountStatusService.activateAccount(req.user as IUser, req.ip);
    const response: ApiResponse<null> = {
      status: "success",
      message:
        "Account activated successfully now you can log in using your email and password.",
    };
    sendResponse(200, res, response);
  });
}
