import { IUser } from "@features/users/interfaces/user.interface";
import { ObjectId } from "mongoose";
import { IFieldsToBeUpdates } from "../fieldsToBeUpdate.interface";

/**
 * Defines a contract for managing user self-service operations in a repository.
 * Provides methods for account deletion, email changes, password updates, account deactivation/activation,
 * and profile modifications, interacting with a MongoDB database via Mongoose.
 */
export interface IUserSelfRepository {
  /**
   * Initiates a request to delete a user's account by saving the request details.
   *
   * @param user - The user object containing details of the account to be deleted
   * @returns Date that resolves when the deletion request is successfully saved
   * @throws Error if the save operation fails
   */
  saveAccountDeletionRequest(user: IUser): Promise<void>;

  /**
   * Updates the status of an existing account deletion request for the specified user.
   *
   * @param user - The user object whose deletion request status needs to be updated
   * @returns Promise that resolves when the deletion status is updated
   * @throws Error if the update operation fails
   */
  deletionRequestConfirmation(user: IUser): Promise<Date>;

  /**
   * Saves a request to change the user's email address to a new one.
   *
   * @param user - The user object requesting the email change
   * @param newEmail - The new email address to be associated with the user's account
   * @returns Promise that resolves when the email change request is saved
   * @throws Error if the save operation fails
   */
  saveEmailChangeRequest(user: IUser, newEmail: string): Promise<void>;

  /**
   * Updates the status of an email change request for the specified user.
   *
   * @param user - The user object whose email change request status needs to be updated
   * @returns Promise that resolves when the email change status is updated
   * @throws Error if the update operation fails
   */
  confirmEmailChangeStatus(user: IUser): Promise<void>;

  /**
   * Saves a token used for verifying the user's email address.
   *
   * @param user - The user object for whom the email verification token is generated
   * @returns Promise that resolves when the verification token is saved
   * @throws Error if the save operation fails
   */
  resendNewEmailVerificationToken(user: IUser): Promise<void>;

  /**
   * Updates the user's email address in the repository after verification.
   *
   * @param user - The user object whose email address will be updated
   * @returns Promise that resolves when the email is successfully updated
   * @throws Error if the update operation fails
   */
  verifyNewEmailOwnership(user: IUser): Promise<void>;

  /**
   * Updates the user's preference for enabling or disabling notifications within a transaction.
   *
   * @param userId - The unique identifier (ObjectId) of the user whose notification settings are to be updated
   * @param enabled - A flag indicating whether notifications should be enabled (true) or disabled (false)
   * @returns Promise that resolves when the notification setting is updated
   * @throws Error if the update operation fails or the transaction aborts
   */
  updateNotificationsEnabled(userId: ObjectId, enabled: boolean): Promise<void>;

  /**
   * Updates the user's password to a new value.
   *
   * @param user - The user object whose password will be updated
   * @param newPassword - The new password to be set for the user's account
   * @returns Promise that resolves when the password is successfully updated
   * @throws Error if the update operation fails
   */
  updateUserPassword(user: IUser, newPassword: string): Promise<void>;

  /**
   * Initiates a request to deactivate the user's account by saving the request details.
   *
   * @param user - The user object requesting account deactivation
   * @returns Promise that resolves when the deactivation request is saved
   * @throws Error if the save operation fails
   */
  saveAccountDeactivationRequest(user: IUser): Promise<void>;

  /**
   * Updates the status of an account deactivation request for the specified user.
   *
   * @param user - The user object whose deactivation request status needs to be updated
   * @returns Promise that resolves when the deactivation status is updated
   * @throws Error if the update operation fails
   */
  updateDeactivationRequestConfirmed(user: IUser): Promise<void>;

  /**
   * Updates the status of an account activation process for the specified user.
   *
   * @param user - The user object whose activation status needs to be updated
   * @returns Promise that resolves when the activation status is updated
   * @throws Error if the update operation fails
   */
  activateAccount(user: IUser): Promise<void>;

  /**
   * Retrieves a user by their unique identifier.
   *
   * @param userId - The unique identifier (ObjectId) of the user to retrieve
   * @returns Promise that resolves to the user object or null if not found
   * @throws Error if the retrieval operation fails
   */
  findUserById(userId: ObjectId): Promise<IUser>;

  /**
   * Retrieves a user by their unique identifier with specified fields selected.
   *
   * @param userId - The unique identifier (ObjectId) of the user to retrieve
   * @param fieldsToBeSelected - An array of field names to include in the returned user object
   * @returns Promise that resolves to the user object with selected fields or null if not found
   * @throws Error if the retrieval operation fails
   */
  findUserByIdAndSelectFields(
    userId: ObjectId,
    fieldsToBeSelected: string[]
  ): Promise<IUser>;

  /**
   * Updates the user's profile picture with a new image URL and public identifier.
   *
   * @param userId - The unique identifier (ObjectId) of the user whose profile picture is to be updated
   * @param picture - An object containing the URL of the new profile picture and its public identifier
   * @returns Promise that resolves to the updated user object
   * @throws Error if the update operation fails
   */
  updateUserProfilePicture(
    userId: ObjectId,
    pictureData: { url: string; publicId: string }
  ): Promise<IUser>;

  /**
   * Updates specific fields in the user's profile information.
   *
   * @param userId - The unique identifier (ObjectId) of the user whose profile information is to be updated
   * @param updatedField - An object specifying the fields to be updated and their new values
   * @returns Promise that resolves to the updated user object or null if not found or update fails
   * @throws Error if the update operation fails
   */
  updateUserProfileInformation(
    userId: ObjectId,
    updatedField: IFieldsToBeUpdates
  ): Promise<IUser>;
}
