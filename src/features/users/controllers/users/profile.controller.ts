// system imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Shard imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { IProfileService } from "../../interfaces/index";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.ProfileService)
    private readonly profileService: IProfileService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
  /**
   * Updates the user's profile picture.
   * This involves uploading a new picture and saving the reference to the user's profile.
   */
  public updateProfilePicture = catchAsync(
    async (req: Request, res: Response) => {
      const updatedUser = await this.profileService.updateProfilePicture(
        req.user,
        req.file
      );
      const response: ApiResponse<IUser> = {
        status: "success",
        message: "Profile picture updated successfully",
        data: { user: updatedUser },
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Updates the user's profile information such as name, bio, or contact details.
   * This function allows partial updates to the user's profile.
   */
  public updateProfileInformation = catchAsync(
    async (req: Request, res: Response) => {
      const updatedUser = await this.profileService.updateProfileInformation(
        req.user._id,
        req.profileInformationToUpdate
      );

      const response: ApiResponse<IUser> = {
        status: "success",
        message: "Profile information updated successfully",
        data: { user: updatedUser },
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves the user's profile information.
   * Returns details such as name, email, profile picture, and other user-specific data.
   */

  public getProfile = catchAsync(async (req: Request, res: Response) => {
    const currentUser = await this.profileService.getCurrentUser(req.user._id);
    const response: ApiResponse<IUser> = {
      status: "success",
      message: "User retrieved successfully",
      data: { userData: currentUser },
    };
    this.responseUtils.sendResponse(200, res, response);
  });
}
