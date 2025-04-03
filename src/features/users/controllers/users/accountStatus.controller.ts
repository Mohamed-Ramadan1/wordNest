// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";
// Shard imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { IAccountStatusService } from "../../interfaces/index";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

@injectable()
export class AccountStatusController {
  constructor(
    @inject(TYPES.AccountStatusService)
    private readonly accountStatusService: IAccountStatusService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
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
      this.responseUtils.sendResponse(200, res, response);
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
      this.responseUtils.sendResponse(200, res, response);
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
    this.responseUtils.sendResponse(200, res, response);
  });
}
