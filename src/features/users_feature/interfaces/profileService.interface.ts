import { IUser } from "@features/users_feature/interfaces/user.interface";
import { ObjectId } from "mongoose";
import { IFieldsToBeUpdates } from "@features/users_feature/interfaces/fieldsToBeUpdate.interface";

/**
 * Interface for ProfileService.
 * This interface defines the methods for managing user profiles, such as fetching, updating profile picture, and updating profile information.
 */
export interface IProfileService {
  /**
   * Retrieves the current signed-in user.
   *
   * @param userId - The ID of the user whose profile is being fetched.
   * @returns The user object.
   * @throws AppError - If the user is not found.
   */
  getCurrentUser(userId: ObjectId): Promise<IUser>;

  /**
   * Updates the profile picture of the user.
   *
   * @param user - The user whose profile picture is being updated.
   * @param pictureData - The picture data, including the image file to be uploaded.
   * @returns The updated user object.
   * @throws AppError - If the profile picture upload fails.
   */
  updateProfilePicture(user: IUser, pictureData: any): Promise<IUser>;

  /**
   * Updates the profile information of the user.
   *
   * @param userId - The ID of the user whose profile information is being updated.
   * @param updatedField - The field(s) to be updated (e.g., email, phone, etc.).
   * @returns The updated user object.
   * @throws AppError - If the update fails or the user is not found.
   */
  updateProfileInformation(
    userId: ObjectId,
    updatedField: IFieldsToBeUpdates
  ): Promise<IUser>;
}
