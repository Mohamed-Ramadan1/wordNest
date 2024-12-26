// system imports
import { Request, Response } from "express";

// models imports
import UserModel from "../../models/user.model";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// services imports
import UserService from "../../services/users/user.service";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";
import { ObjectId } from "mongoose";

export class AccountSettingsController {
  /**
   * Allows the user to change their account password.
   * Validates the old password before updating to a new one.
   */
  //! in progress
  public changeAccountPassword = catchAsync(
    async (req: Request, res: Response) => {
      // i expected to reciv the old password and the new password
    }
  );

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

  /**
   * Activates the user's account.
   * This may be used to enable the account after it has been deactivated or suspended.
   */
  //! in progress
  public activateAccount = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Deactivates the user's account.
   * Temporarily disables the account, preventing access and activity.
   */
  //! in progress
  public deactivateAccount = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
