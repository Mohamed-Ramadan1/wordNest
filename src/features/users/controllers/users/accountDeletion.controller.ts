// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import { IAccountDeletionService } from "../../interfaces/index";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// Shard imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

@injectable()
export class AccountDeletionController {
  private accountDeletionService: IAccountDeletionService;
  constructor(
    @inject(TYPES.AccountDeletionService)
    accountDeletionService: IAccountDeletionService
  ) {
    this.accountDeletionService = accountDeletionService;
  }
  /**
   * Handles the user's request to delete their account.
   * This initiates the deletion process and may involve additional verification steps.
   */
  public requestAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountDeletionService.requestAccountDeletion(
        req.user as IUser,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Account deletion request received successfully. We have sent you an email with further instructions.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Confirms the account deletion process.
   * Deletes the user's account after verification or additional security checks.
   */
  public confirmAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountDeletionService.confirmAccountDeletion(
        req.user as IUser,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Account deletion confirmed. Your account has been deleted successfully for some more information please review your email address..",
      };
      sendResponse(200, res, response);
    }
  );
}
