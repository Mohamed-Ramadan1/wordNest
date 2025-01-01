// core module imports
import fs from "fs";

// models imports
import UserModel from "../../models/user.model";

//mongoose imports

import { ObjectId } from "mongoose";
// packages imports
import cloudinary from "cloudinary";
import { AppError } from "@utils/appError";
import { IUser } from "@features/users/interfaces/user.interface";

// config imports
import { CloudinaryQueueType } from "@config/cloudinaryQueue.config";

// jobs imports
import {
  cloudinaryQueue,
  resourceCleanupQueue,
  ResourceCleanupQueueType,
} from "@jobs/index";
// logs imports
import { logFailedImageUpload } from "@logging/index";
// dto imports
import { IFieldsToBeUpdates } from "@features/users/interfaces/fieldsToBeUpdate.interface";

// queue imports

export class ProfileService {
  // get current singed in user
  static async getCurrentUser(userId: ObjectId): Promise<IUser> {
    const user: IUser | null = await UserModel.findById(userId);
    if (!user) {
      throw new AppError("User not found", 401);
    }
    return user;
  }

  // Profile update picture
  static async updateProfilePicture(
    user: IUser,
    pictureData: any
  ): Promise<IUser> {
    // Logic to update profile picture.

    try {
      const uploadedImage: cloudinary.UploadApiResponse | null =
        await cloudinary.v2.uploader.upload(pictureData.path);

      if (!uploadedImage || !uploadedImage.secure_url) {
        logFailedImageUpload("Failed to upload profile picture", user._id);
        throw new AppError("Failed to upload profile picture", 500);
      }

      // add job delete the old image from the local storage to job queue
      resourceCleanupQueue.add(ResourceCleanupQueueType.DeleteLocalFiles, {
        resourcePath: pictureData.path,
        resource: "profile picture",
      });

      // delete the image from the cloudinary storage with queue job
      if (user.profilePictureId) {
        cloudinaryQueue.add(CloudinaryQueueType.DeleteImage, {
          profilePictureId: user.profilePictureId,
          userId: user._id,
        });
      }
      // update user profile picture and public id
      const updatedUser = (await UserModel.findByIdAndUpdate(
        user._id,
        {
          profilePicture: uploadedImage.secure_url,
          profilePictureId: uploadedImage.public_id,
        },
        { new: true }
      )) as IUser;

      // return the updated user.
      return updatedUser;
    } catch (err: any) {
      console.log(err);
      throw new AppError("Fail to upload image", 500);
    }
  }

  // update profile information for the user
  static async updateProfileInformation(
    userId: ObjectId,
    updatedField: IFieldsToBeUpdates
  ): Promise<IUser> {
    try {
      const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
        userId,
        updatedField,
        { new: true }
      );
      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      return updatedUser;
    } catch (err: any) {
      throw new AppError("Fail to update user information", 500);
    }
  }
}
