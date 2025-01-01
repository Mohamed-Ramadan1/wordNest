// express imports
import { Request, Response } from "express";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// services imports
import { AccountPasswordManagementService } from "@features/users/services/users/accountPasswordManagement.service";

// shared interface imports
import { ApiResponse } from "@shared/index";

export class AccountPasswordManagementController {
  /**
   * Allows the user to change their account password.
   * Validates the old password before updating to a new one.
   */
  public changeAccountPassword = catchAsync(
    async (req: Request, res: Response) => {
      await AccountPasswordManagementService.changePassword(
        req.user as IUser,
        req.body.newPassword
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "your password have been changed successfully.",
      };

      sendResponse(200, res, response);
    }
  );
}
