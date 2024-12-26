// core module imports
import fs from "fs";

// models imports
import UserModel from "../../models/user.model";

//mongoose imports

import { ClientSession, startSession, ObjectId } from "mongoose";
// packages imports
import cloudinary from "cloudinary";
import { AppError } from "@utils/appError";
import { IUser } from "@features/users/interfaces/user.interface";

// config imports
import { CloudinaryQueueType } from "@config/cloudinaryQueue.config";

// jobs imports
import { cloudinaryQueue } from "@jobs/index";
// logs imports
import { logFailedImageUpload } from "@logging/index";
// dto imports
import { IFieldsToBeUpdates } from "@features/users/dtos/users.dto";

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
    const session: ClientSession = await startSession();

    try {
      session.startTransaction();
      const uploadedImage: cloudinary.UploadApiResponse | null =
        await cloudinary.v2.uploader.upload(pictureData.path);

      if (!uploadedImage || !uploadedImage.secure_url) {
        logFailedImageUpload("Failed to upload profile picture", user._id);
        throw new AppError("Failed to upload profile picture", 500);
      }

      // delete the old image from the public storage
      await fs.promises.unlink(pictureData.path);

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
        { new: true, session }
      )) as IUser;

      // commit transaction
      await session.commitTransaction();

      // return the updated user.
      return updatedUser;
    } catch (err: any) {
      console.log(err);
      await session.abortTransaction();
      throw new AppError("Fail to upload image", 500);
    } finally {
      session.endSession();
    }
  }

  static async updateProfileInformation(
    userId: ObjectId,
    updatedField: IFieldsToBeUpdates
  ): Promise<IUser> {
    const session: ClientSession = await startSession();

    try {
      session.startTransaction();
      const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
        userId,
        updatedField,
        { new: true, session }
      );
      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      await session.commitTransaction();
      return updatedUser;
    } catch (err: any) {
      await session.abortTransaction();
      throw new AppError("Fail to update user information", 500);
    } finally {
      session.endSession();
    }
  }
}
