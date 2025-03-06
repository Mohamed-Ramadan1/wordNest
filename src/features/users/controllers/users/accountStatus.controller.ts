// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";
// Shard imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { IAccountStatusService } from "../../interfaces/index";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

@injectable()
export class AccountStatusController {
  private accountStatusService: IAccountStatusService;
  constructor(
    @inject(TYPES.AccountStatusService)
    accountStatusService: IAccountStatusService
  ) {
    this.accountStatusService = accountStatusService;
  }
  /**
   * Deactivates the user's account.
   * Temporarily disables the account, preventing access and activity.
   */
  public deactivateAccountRequest = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountStatusService.deactivateAccountReq(
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
      await this.accountStatusService.deactivateAccountConfirmation(
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
    await this.accountStatusService.activateAccount(req.user as IUser, req.ip);
    const response: ApiResponse<null> = {
      status: "success",
      message:
        "Account activated successfully now you can log in using your email and password.",
    };
    sendResponse(200, res, response);
  });
}
