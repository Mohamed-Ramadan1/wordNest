// system imports
import { Request, Response } from "express";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// services imports
import { ProfileService } from "@features/users/services/users/profile.service";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

import { ObjectId } from "mongoose";

export class ProfileController {
  /**
   * Updates the user's profile picture.
   * This involves uploading a new picture and saving the reference to the user's profile.
   */
  public updateProfilePicture = catchAsync(
    async (req: Request, res: Response) => {
      const updatedUser = await ProfileService.updateProfilePicture(
        req.user as IUser,
        req.file
      );
      const response: ApiResponse<IUser> = {
        status: "success",
        message: "Profile picture updated successfully",
        data: { user: updatedUser },
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Updates the user's profile information such as name, bio, or contact details.
   * This function allows partial updates to the user's profile.
   */
  public updateProfileInformation = catchAsync(
    async (req: Request, res: Response) => {
      const updatedUser = await ProfileService.updateProfileInformation(
        req.user?._id as ObjectId,
        req.profileInformationToUpdate
      );

      const response: ApiResponse<IUser> = {
        status: "success",
        message: "Profile information updated successfully",
        data: { user: updatedUser },
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves the user's profile information.
   * Returns details such as name, email, profile picture, and other user-specific data.
   */

  public getProfile = catchAsync(async (req: Request, res: Response) => {
    const currentUser = await ProfileService.getCurrentUser(
      req.user?._id as ObjectId
    );
    const response: ApiResponse<IUser> = {
      status: "success",
      message: "User retrieved successfully",
      data: { userData: currentUser },
    };
    sendResponse(200, res, response);
  });
}
