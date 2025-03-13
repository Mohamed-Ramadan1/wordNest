import { IUser } from "../user.interface";
import { Roles } from "../user.interface";
import { ObjectId } from "mongoose";
import { Request } from "express";

/**
 * Interface for user management repository operations.
 * Defines methods for managing user account ban and lock status with related operations,
 * as well as user creation, updates, and role management.
 */
export interface IUserManagementRepository {
  /**
   * Retrieves a list of users based on query parameters.
   *
   * @param req - The Express Request object containing query parameters for filtering, sorting, limiting fields, and pagination
   * @returns Promise that resolves to an array of user objects
   * @throws Error if the retrieval operation fails
   */
  getUsers(req: Request): Promise<IUser[]>;
  /**
   * Retrieves a user by their unique identifier.
   *
   * @param userId - The unique identifier (ObjectId) of the user to retrieve
   * @returns Promise that resolves to the user object or null if not found
   * @throws Error if the retrieval operation fails
   */
  getUserById(userId: ObjectId): Promise<IUser>;

  /**
   * Creates a new user with the provided user data.
   *
   * @param userData - The user data to create a new user with
   * @returns Promise that resolves to the created user object or null
   * @throws Error if the creation operation fails
   */
  createUser(userData: IUser): Promise<IUser>;

  /**
   * Updates an existing user with new data.
   *
   * @param userId - The unique identifier (ObjectId) of the user to update
   * @param userData - The updated user data
   * @returns Promise that resolves to the updated user object or null if not found
   * @throws Error if the update operation fails
   */
  updateUser(userId: ObjectId, userData: IUser): Promise<IUser>;

  /**
   * Bans a user account with specified parameters.
   *
   * @param user - The user to be banned
   * @param adminUser - The admin user performing the ban action
   * @param banReason - The reason for banning the user
   * @param accountBannedDays - Number of days for which the account will be banned
   * @returns Promise that resolves when the ban operation is complete
   * @throws Error if the ban operation fails
   */
  banUser(
    user: IUser,
    adminUser: IUser,
    banReason: string,
    accountBannedDays: number
  ): Promise<void>;

  /**
   * Removes a ban from a user account.
   *
   * @param user - The user to be unbanned
   * @param adminUnBanComment - Comment explaining the reason for unbanning
   * @param adminUser - The admin user performing the unban action
   * @returns Promise that resolves when the unban operation is complete
   * @throws Error if the unban operation fails
   */
  unBanUser(
    user: IUser,
    adminUnBanComment: string,
    adminUser: IUser
  ): Promise<void>;

  /**
   * Locks a user account with specified parameters.
   *
   * @param user - The user whose account will be locked
   * @param lockReason - The reason for locking the account
   * @param adminUser - The admin user performing the lock action
   * @returns Promise that resolves when the lock operation is complete
   * @throws Error if the lock operation fails
   */
  lockAccount(user: IUser, lockReason: string, adminUser: IUser): Promise<void>;

  /**
   * Unlocks a previously locked user account.
   *
   * @param user - The user whose account will be unlocked
   * @param unLockComment - Comment explaining the reason for unlocking
   * @param adminUser - The admin user performing the unlock action
   * @returns Promise that resolves when the unlock operation is complete
   * @throws Error if the unlock operation fails
   */
  unlockAccount(
    user: IUser,
    unLockComment: string,
    adminUser: IUser
  ): Promise<void>;

  /**
   * Adds a role to a user's existing roles.
   *
   * @param user - The user to add the role to
   * @param role - The role to be added
   * @returns Promise that resolves when the role is added
   * @throws Error if the operation fails
   */
  addRole(user: IUser, role: Roles): Promise<void>;

  /**
   * Removes a role from a user's existing roles.
   *
   * @param user - The user to remove the role from
   * @param role - The role to be removed
   * @returns Promise that resolves when the role is removed
   * @throws Error if the operation fails
   */
  removeRole(user: IUser, role: Roles): Promise<void>;

  /**
   * Lists all roles associated with a user.
   *
   * @param userId - The unique identifier (ObjectId) of the user
   * @returns Promise that resolves to the user object containing roles or null if not found
   * @throws Error if the operation fails
   */
  listUserRoles(userId: ObjectId): Promise<IUser | null>;

  /**
   * Resets a user's roles to the default role (typically Roles.User).
   *
   * @param userId - The unique identifier (ObjectId) of the user
   * @returns Promise that resolves when the roles are reset
   * @throws Error if the operation fails or user not found
   */
  resetUserRoles(userId: ObjectId): Promise<void>;
}
