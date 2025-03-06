import { IUser, Roles } from "./user.interface";

export interface IRolesManagementService {
  /**
   * Adds a role to a user.
   * @param userToBeAssigned - The user object to whom the role is to be assigned.
   * @param role - The role to be assigned to the user.
   * @throws {AppError} If an error occurs while updating the user's roles.
   */
  addRoleToUser(userToBeAssigned: IUser, role: Roles): Promise<void>;

  /**
   * Removes a role from a user.
   * @param userToBeAssigned - The user object from whom the role is to be removed.
   * @param role - The role to be removed from the user.
   * @throws {AppError} If an error occurs while updating the user's roles.
   */
  removeRoleFromUser(userToBeAssigned: IUser, role: string): Promise<void>;

  /**
   * Lists all roles assigned to a user.
   * @param userId - The ID of the user whose roles are to be retrieved.
   * @returns An object containing the user's roles and email.
   * @throws {AppError} If the user does not exist or an error occurs.
   */
  listUserRoles(
    userId: string
  ): Promise<{ roles: string[]; userEmail: string }>;

  /**
   * Resets a user's roles, keeping only the default 'User' role.
   * @param userId - The ID of the user whose roles are to be reset.
   * @throws {AppError} If the user does not exist or an error occurs.
   */
  resetUserRoles(userId: string): Promise<void>;
}
