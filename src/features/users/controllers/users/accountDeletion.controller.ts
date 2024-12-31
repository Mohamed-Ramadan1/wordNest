// express imports
import { Request, Response } from "express";

//services imports
import { AccountDeletionService } from "../../services/users/accountDeletion.service";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

export class AccountDeletionController {
  /**
   * Handles the user's request to delete their account.
   * This initiates the deletion process and may involve additional verification steps.
   */
  public requestAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {
      await AccountDeletionService.requestAccountDeletion(req.user as IUser);
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
      await AccountDeletionService.confirmAccountDeletion(req.user as IUser);
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Account deletion confirmed. Your account has been deleted successfully.",
      };
      sendResponse(200, res, response);
    }
  );
}

/**
 * user will request deletion of account
 * user will recive account with information about deletion and the information about the deletion process and the consequences of deleting the account
 *user will confirm the dlg deletion 

  * user will have attribute to request deletion of the account the delete operation will created as job and added to new job queue called accountDeleteQueue
 * create send email to virifay the action 
 * handel the case of the middleware and its related actions 
 *  */
