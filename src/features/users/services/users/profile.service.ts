// packages imports
import { inject, injectable } from "inversify";

// models imports
import UserModel from "../../models/user.model";

//mongoose imports

import { ObjectId } from "mongoose";
// packages imports
import cloudinary from "cloudinary";
import {
  AppError,
  handleServiceError,
  TYPES,
  uploadToCloudinary,
} from "@shared/index";
import { IUser } from "@features/users/interfaces/user.interface";

// jobs imports
import { cloudinaryQueue, CloudinaryQueueJobs } from "@jobs/index";

// dto imports
import { IFieldsToBeUpdates } from "@features/users/interfaces/fieldsToBeUpdate.interface";

//interfaces imports
import { IProfileService, IUserSelfRepository } from "../../interfaces/index";

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository
  ) {}
  // get current singed in user
  public async getCurrentUser(userId: ObjectId): Promise<IUser> {
    try {
      const user = await this.userSelfRepository.findUserById(userId);
      return user;
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  // Profile update picture
  public async updateProfilePicture(
    user: IUser,
    pictureData: any
  ): Promise<IUser> {
    // Logic to update profile picture.

    try {
      // upload the image to cloudinary(with removing local image after successful upload.)
      const uploadedImage: cloudinary.UploadApiResponse | null =
        await uploadToCloudinary(pictureData.path, "profile picture");

      // delete the image from the cloudinary storage with queue job
      if (user.profilePictureId) {
        cloudinaryQueue.add(CloudinaryQueueJobs.DeleteImage, {
          publicId: user.profilePictureId,
          userId: user._id,
        });
      }

      const updatedUser: IUser =
        await this.userSelfRepository.updateUserProfilePicture(user._id, {
          url: uploadedImage?.secure_url,
          publicId: uploadedImage?.public_id,
        });

      // return the updated user.
      return updatedUser;
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  // update profile information for the user
  public async updateProfileInformation(
    userId: ObjectId,
    updatedField: IFieldsToBeUpdates
  ): Promise<IUser> {
    try {
      const updatedUser: IUser =
        await this.userSelfRepository.updateUserProfileInformation(
          userId,
          updatedField
        );
      return updatedUser;
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
