import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shard imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import {
  IBanUserAccountService,
  BandAccountsBody,
} from "../../interfaces/index";

@injectable()
export class BanUsersAccountsController {
  constructor(
    @inject(TYPES.BanUserAccountService)
    private readonly banUserAccountService: IBanUserAccountService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  /**
   * Bans a user account.
   * Restricts the user from accessing the system by marking the account as banned.
   */
  public banUserAccount = catchAsync(
    async (req: Request<{}, {}, BandAccountsBody>, res: Response) => {
      // Implementation for banning
      const { banAccountReason, banAccountDaysNumber, accountToBeBanned } =
        req.body;

      await this.banUserAccountService.banUserAccount(
        accountToBeBanned,
        banAccountReason,
        banAccountDaysNumber,
        req.ip,
        req.user
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "User account has been successfully banned",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Un-bans a user account.
   * Restores the user's access to the system by removing the ban status.
   */
  public unBanUserAccount = catchAsync(
    async (req: Request<{}, {}, BandAccountsBody>, res: Response) => {
      // Implementation for un-banning
      const { accountToBeUnbaned, adminUnbanComment } = req.body;

      await this.banUserAccountService.unBanUserAccount(
        accountToBeUnbaned,
        req.ip,
        adminUnbanComment,
        req.user
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "User account has been successfully un-banned",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
