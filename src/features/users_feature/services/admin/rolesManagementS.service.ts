// models imports
import UserModel from "@features/users_feature/models/user.model";

// interfaces imports
import {
  IUser,
  Roles,
} from "@features/users_feature/interfaces/user.interface";

// utils imports
import { AppError } from "@utils/appError";

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
      throw new AppError(err.message, 400);
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
      throw new AppError(err.message, 400);
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
      throw new AppError(err.message, 400);
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
      throw new AppError(err.message, 400);
    }
  }
}
