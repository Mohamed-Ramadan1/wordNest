// models imports
import UserModel from "../../models/user.model";

//mongoose imports

import { ObjectId } from "mongoose";
// packages imports
import cloudinary from "cloudinary";
import { AppError } from "@utils/appError";
import { IUser } from "@features/users_feature/interfaces/user.interface";

// jobs imports
import { cloudinaryQueue, CloudinaryQueueJobs } from "@jobs/index";

// dto imports
import { IFieldsToBeUpdates } from "@features/users_feature/interfaces/fieldsToBeUpdate.interface";
import { uploadToCloudinary } from "@utils/index";

//interfaces imports
import { IProfileService } from "../../interfaces/index";

export class ProfileService implements IProfileService {
  // get current singed in user
  public async getCurrentUser(userId: ObjectId): Promise<IUser> {
    const user: IUser | null = await UserModel.findById(userId);
    if (!user) {
      throw new AppError("User not found", 401);
    }
    return user;
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
  public async updateProfileInformation(
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
