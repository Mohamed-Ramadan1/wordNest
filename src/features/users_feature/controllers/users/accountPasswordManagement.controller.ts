// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// shared imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IAccountPasswordManagementService } from "../../interfaces/index";
// interfaces imports
import { IUser } from "@features/users_feature/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

@injectable()
export class AccountPasswordManagementController {
  private accountPasswordManagementService: IAccountPasswordManagementService;
  constructor(
    @inject(TYPES.AccountPasswordManagementService)
    accountPasswordManagementService: IAccountPasswordManagementService
  ) {
    this.accountPasswordManagementService = accountPasswordManagementService;
  }
  /**
   * Allows the user to change their account password.
   * Validates the old password before updating to a new one.
   */
  public changeAccountPassword = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountPasswordManagementService.changePassword(
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
