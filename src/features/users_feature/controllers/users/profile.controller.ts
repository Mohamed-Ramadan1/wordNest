// system imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shared imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IProfileService } from "../../interfaces/index";
// interfaces imports
import { IUser } from "@features/users_feature/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

import { ObjectId } from "mongoose";

@injectable()
export class ProfileController {
  private profileService: IProfileService;
  constructor(
    @inject(TYPES.ProfileService)
    profileService: IProfileService
  ) {
    this.profileService = profileService;
  }
  /**
   * Updates the user's profile picture.
   * This involves uploading a new picture and saving the reference to the user's profile.
   */
  public updateProfilePicture = catchAsync(
    async (req: Request, res: Response) => {
      const updatedUser = await this.profileService.updateProfilePicture(
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
      const updatedUser = await this.profileService.updateProfileInformation(
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
    const currentUser = await this.profileService.getCurrentUser(
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
