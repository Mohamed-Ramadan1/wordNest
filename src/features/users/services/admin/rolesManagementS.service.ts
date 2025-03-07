// models imports
import UserModel from "@features/users/models/user.model";

// interfaces imports
import { IUser, Roles } from "@features/users/interfaces/user.interface";

// utils imports
import { handleServiceError, AppError } from "@shared/index";

// interfaces imports
import { IRolesManagementService } from "../../interfaces/index";

export class RolesManagementService implements IRolesManagementService {
  /**
   * Adds a role to a user.
   * Updates the user's roles by adding the specified role.
   */
  public async addRoleToUser(userToBeAssigned: IUser, role: Roles) {
    try {
      userToBeAssigned.roles.push(role);
      await userToBeAssigned.save();
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Removes a role from a user.
   * Updates the user's roles by removing the specified role.
   */
  public async removeRoleFromUser(userToBeAssigned: IUser, role: string) {
    try {
      userToBeAssigned.roles = userToBeAssigned.roles.filter((r) => r !== role);
      await userToBeAssigned.save();
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Lists all roles assigned to a user.
   * Retrieves all roles currently associated with the user.
   */
  public async listUserRoles(
    userId: string
  ): Promise<{ roles: string[]; userEmail: string }> {
    try {
      const user: IUser | null = await UserModel.findById(userId);
      if (!user) {
        throw new AppError("No user existing with this id.", 404);
      }
      return { roles: user.roles, userEmail: user.email };
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Remove all user roles and keep only the default role(user).
   */
  public async resetUserRoles(userId: string) {
    try {
      const user: IUser | null = await UserModel.findById(userId);
      if (!user) {
        throw new AppError("No user existing with this id.", 404);
      }
      user.roles = [Roles.User];
      await user.save();
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
