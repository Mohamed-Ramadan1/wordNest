// models imports
import UserModel from "@features/users/models/user.model";

// interfaces imports
import { IUser, Roles } from "@features/users/interfaces/user.interface";

// utils imports
import { AppError } from "@utils/appError";

export class RolesManagementService {
  /**
   * Adds a role to a user.
   * Updates the user's roles by adding the specified role.
   */
  static async addRoleToUser(userToBeAssigned: IUser, role: Roles) {
    try {
      userToBeAssigned.roles.push(role);
      await userToBeAssigned.save();
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
  }

  /**
   * Removes a role from a user.
   * Updates the user's roles by removing the specified role.
   */
  static async removeRoleFromUser(userToBeAssigned: IUser, role: string) {
    try {
      userToBeAssigned.roles = userToBeAssigned.roles.filter((r) => r !== role);
      await userToBeAssigned.save();
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
  }

  /**
   * Lists all roles assigned to a user.
   * Retrieves all roles currently associated with the user.
   */
  static async listUserRoles(
    userId: string
  ): Promise<{ roles: string[]; userEmail: string }> {
    try {
      const user: IUser | null = await UserModel.findById(userId);
      if (!user) {
        throw new AppError("No user existing with this id.", 404);
      }
      return { roles: user.roles, userEmail: user.email };
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
  }

  /**
   * Remove all user roles and keep only the default role(user).
   */
  static async resetUserRoles(userId: string) {
    try {
      const user: IUser | null = await UserModel.findById(userId);
      if (!user) {
        throw new AppError("No user existing with this id.", 404);
      }
      user.roles = [Roles.User];
      await user.save();
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
  }
}
