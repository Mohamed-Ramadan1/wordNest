import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// shared imports
import { TYPES } from "@shared/index";

// interfaces imports
import { ILockAccountService } from "../../interfaces/index";
// Utils imports
import { catchAsync, sendResponse } from "@utils/index";
import { LockAccountBody } from "@features/users_feature/interfaces/lockAccountBody.interface";

import { ApiResponse } from "@shared/index";
import { IUser } from "@features/users_feature/interfaces/user.interface";

@injectable()
export class LockAccountsController {
  private lockAccountService: ILockAccountService;
  constructor(
    @inject(TYPES.LockAccountService)
    lockAccountService: ILockAccountService
  ) {
    this.lockAccountService = lockAccountService;
  }
  /**
   * Locks a user account.
   * Temporarily restricts access to the account for a specified period.
   */
  public lockAccount = catchAsync(
    async (req: Request<{}, {}, LockAccountBody>, res: Response) => {
      const { lockReason, userAccountToBeLocked } = req.body;
      await this.lockAccountService.lockAccount(
        userAccountToBeLocked,
        lockReason,
        req.ip,
        req.user as IUser
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Account locked successfully",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Unlocks a user account.
   * Restores access to the account by removing the lock status.
   */
  public unlockAccount = catchAsync(
    async (req: Request<{}, {}, LockAccountBody>, res: Response) => {
      const { unLockComment, userAccountToBeUnLocked } = req.body;
      await this.lockAccountService.unlockAccount(
        userAccountToBeUnLocked,
        unLockComment,
        req.ip,
        req.user as IUser
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Account unlocked successfully",
      };

      sendResponse(200, res, response);
    }
  );
}
