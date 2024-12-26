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

export class AccountEmailController {
  /**
   * Handles a request to change the user's email address.
   * Initiates the process, including generating a verification token.
   */
  //! in progress
  public requestAccountEmailChange = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Confirms the user's email address change.
   * Verifies the provided token and updates the email address in the user's account.
   */
  //! in progress
  public confirmAccountEmailChange = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
