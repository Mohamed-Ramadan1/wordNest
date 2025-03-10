// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import { IUser, Roles } from "@features/users/interfaces/user.interface";

// utils imports
import { handleServiceError, AppError, TYPES } from "@shared/index";

// interfaces imports
import {
  IRolesManagementService,
  IUserManagementRepository,
} from "../../interfaces/index";

import { ObjectId } from "mongoose";

@injectable()
export class RolesManagementService implements IRolesManagementService {
  constructor(
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository
  ) {}
  /**
   * Adds a role to a user.
   * Updates the user's roles by adding the specified role.
   */
  public async addRoleToUser(userToBeAssigned: IUser, role: Roles) {
    try {
      await this.userManagementRepository.addRole(userToBeAssigned, role);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Removes a role from a user.
   * Updates the user's roles by removing the specified role.
   */
  public async removeRoleFromUser(userToBeAssigned: IUser, role: Roles) {
    try {
      await this.userManagementRepository.removeRole(userToBeAssigned, role);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Lists all roles assigned to a user.
   * Retrieves all roles currently associated with the user.
   */
  public async listUserRoles(
    userId: ObjectId
  ): Promise<{ roles: string[]; userEmail: string }> {
    try {
      const user: IUser | null =
        await this.userManagementRepository.listUserRoles(userId);
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
  public async resetUserRoles(userId: ObjectId) {
    try {
      await this.userManagementRepository.resetUserRoles(userId);
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
