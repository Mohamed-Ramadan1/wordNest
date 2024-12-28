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

export class AccountStatusController {
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
