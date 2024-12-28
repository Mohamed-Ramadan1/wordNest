// express imports
import { Request, Response } from "express";

// mongoose imports
import { ObjectId } from "mongoose";

// models imports
import UserModel from "../../models/user.model";

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
  //! in progress
  public requestAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Confirms the account deletion process.
   * Deletes the user's account after verification or additional security checks.
   */
  //! in progress
  public confirmAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
