// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shard imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { IAccountPasswordManagementService } from "../../interfaces/index";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

@injectable()
export class AccountPasswordManagementController {
  constructor(
    @inject(TYPES.AccountPasswordManagementService)
    private readonly accountPasswordManagementService: IAccountPasswordManagementService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
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

      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
