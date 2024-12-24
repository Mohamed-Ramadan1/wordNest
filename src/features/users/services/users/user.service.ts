// core module imports
import fs from "fs";
// models imports
import UserModel from "../../models/user.model";

//mongoose imports
import { ClientSession, startSession } from "mongoose";
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
export default class UserService {
  // Profile Management
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

  static async updateProfileInformation(userId: string, profileData: any) {
    // Logic to update profile information
  }

  // Password Management
  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    // Logic to change the account password
  }

  // Account Deletion
  static async requestAccountDeletion(userId: string) {
    // Logic to handle account deletion request
  }

  static async confirmAccountDeletion(userId: string) {
    // Logic to confirm account deletion
  }

  // Account Activation/Deactivation
  static async activateAccount(userId: string) {
    // Logic to activate the account
  }

  static async deactivateAccount(userId: string) {
    // Logic to deactivate the account
  }

  // Notifications
  static async enableNotifications(userId: string) {
    // Logic to enable notifications
  }

  static async disableNotifications(userId: string) {
    // Logic to disable notifications
  }

  // Email Management
  static async requestEmailChange(userId: string, newEmail: string) {
    // Logic to request an email change
  }

  static async confirmEmailChange(userId: string, token: string) {
    // Logic to confirm email change
  }

  // Social Account Management
  static async addSocialAccount(userId: string, socialAccountData: any) {
    // Logic to add a social account
  }

  static async removeSocialAccount(userId: string, socialAccountId: string) {
    // Logic to remove a social account
  }

  // Data Export
  static async exportUserData(userId: string) {
    // Logic to export account data
  }
}
