import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import { BandAccountsBody } from "../../interfaces/bandAccountsBody.interface";

// services imports
import { BanUserAccountService } from "@features/users/services/admin/banUsersAccounts.service";

export class BanUsersAccountsController {
  /**
   * Bans a user account.
   * Restricts the user from accessing the system by marking the account as banned.
   */
  public banUserAccount = catchAsync(
    async (req: Request<{}, {}, BandAccountsBody>, res: Response) => {
      // Implementation for banning
      const { banAccountReason, banAccountDaysNumber, accountToBeBanned } =
        req.body;

      await BanUserAccountService.banUserAccount(
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
      sendResponse(200, res, response);
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

      await BanUserAccountService.unBanUserAccount(
        accountToBeUnbaned,
        req.ip,
        adminUnbanComment,
        req.user
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "User account has been successfully un-banned",
      };
      sendResponse(200, res, response);
    }
  );
}
