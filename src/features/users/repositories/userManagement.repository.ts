// packages imports
import { Request } from "express";
import { inject, injectable } from "inversify";
import { Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

// interfaces imports
import { IUser, IUserManagementRepository } from "../interfaces/index";
import { Roles } from "../interfaces/user.interface";

// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

@injectable()
export class UserManagementRepository implements IUserManagementRepository {
  constructor(
    @inject(TYPES.USER_MODEL) private readonly userModel: Model<IUser>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IUser[], IUser>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IUser>
  ) {}

  public async getUsers(req: Request): Promise<IUser[]> {
    try {
      const features = this.apiFeatures(this.userModel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const users: IUser[] = await features.execute();
      return users;
    } catch (err: any) {
      throw new Error(`Failed to get users: ${err.message}`);
    }
  }

  public async getUserById(userId: ObjectId): Promise<IUser> {
    try {
      const user: IUser | null = await this.userModel.findById(userId);
      if (!user) {
        throw new Error(`No user exist with this id.`);
      }
      return user;
    } catch (err: any) {
      throw new Error(`Failed to get user by id: ${err.message}`);
    }
  }

  public async createUser(userData: IUser): Promise<IUser> {
    try {
      const user = new this.userModel(userData);
      user.createEmailVerificationToken();
      const savedUser = await user.save();

      return savedUser;
    } catch (err: any) {
      throw new Error(`Failed to create user: ${err.message}`);
    }
  }

  public async updateUser(userId: ObjectId, userData: IUser): Promise<IUser> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: userData },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedUser) {
        throw new Error(`User with ID ${userId} not found`);
      }

      return updatedUser;
    } catch (err: any) {
      throw new Error(`Failed to update user: ${err.message}`);
    }
  }

  public async banUser(
    user: IUser,
    adminUser: IUser,
    banReason: string,
    accountBannedDays: number
  ): Promise<void> {
    try {
      user.isAccountBanned = true;
      user.accountBannedAt = new Date();

      user.accountBannedByAdminEmail = adminUser.email;
      user.accountBannedReason = banReason;
      user.accountBandPeriodDays = accountBannedDays;
      user.accountBannedUntil = new Date(
        Date.now() + accountBannedDays * 24 * 60 * 60 * 1000
      );

      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to ban user account: ${err.message}`);
    }
  }

  public async unBanUser(
    user: IUser,
    adminUnBanComment: string,
    adminUser: IUser
  ): Promise<void> {
    try {
      user.isAccountBanned = false;
      user.accountUnbannedAt = new Date();
      user.accountUnbannedBy = adminUser.email;
      user.accountUnbannedComment = adminUnBanComment;
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to un-ban user account: ${err.message}`);
    }
  }

  public async lockAccount(
    user: IUser,
    lockReason: string,
    adminUser: IUser
  ): Promise<void> {
    try {
      user.isAccountLocked = true;
      user.accountLockedReason = lockReason;
      user.accountLockedAt = new Date();
      user.accountLockedByAdminEmail = adminUser.email;
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to lock user account: ${err.message}`);
    }
  }

  public async unlockAccount(
    user: IUser,
    unLockComment: string,
    adminUser: IUser
  ): Promise<void> {
    try {
      user.accountLockedAt = new Date();
      user.accountUnlockedBy = adminUser.email;
      user.accountUnlockedComment = unLockComment;
      user.isAccountLocked = false;
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to unlock user account: ${err.message}`);
    }
  }
  public async addRole(user: IUser, role: Roles): Promise<void> {
    try {
      user.roles.push(role);
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to add role to user: ${err.message}`);
    }
  }

  public async removeRole(user: IUser, role: Roles): Promise<void> {
    try {
      user.roles = user.roles.filter((r) => r !== role);
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to remove role from user: ${err.message}`);
    }
  }

  public async listUserRoles(userId: ObjectId): Promise<IUser | null> {
    try {
      const user: IUser | null = await this.userModel.findById(userId);
      return user;
    } catch (err: any) {
      throw new Error(`Failed to list user roles: ${err.message}`);
    }
  }

  public async resetUserRoles(userId: ObjectId): Promise<void> {
    try {
      const user: IUser | null = await this.userModel.findById(userId);
      if (!user) {
        throw new Error("No user existing with this id.");
      }
      user.roles = [Roles.User];
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to reset user roles: ${err.message}`);
    }
  }
}
