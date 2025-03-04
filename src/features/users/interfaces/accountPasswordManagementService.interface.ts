import { IUser } from "@features/users/interfaces/user.interface";

/**
 * Interface for the AccountPasswordManagementService class.
 * This interface outlines the method for changing a user's password.
 */
export interface IAccountPasswordManagementService {
  /**
   * Changes the user's password.
   *
   * @param user - The user whose password is to be changed.
   * @param newPassword - The new password to set for the user.
   * @returns A promise that resolves once the password is successfully changed.
   * @throws AppError - If the operation fails during the password update.
   */
  changePassword(user: IUser, newPassword: string): Promise<void>;
}
