import { ObjectId } from "mongoose";

/**
 * Interface for logging user account banning and unbanning events.
 */
export interface IBandAccountsLogger {
  /**
   * Log a successful user account ban event.
   * @param adminUserEmail - The email of the admin performing the action.
   * @param adminUserId - The ID of the admin performing the action.
   * @param bannedUserEmail - The email of the banned user.
   * @param bannedUserId - The ID of the banned user.
   * @param banReason - The reason for banning the user.
   * @param banDays - The duration of the ban in days.
   * @param ipAddress - The IP address of the admin performing the action (optional).
   */
  logSuccessBanUserAccount(
    adminUserEmail: string,
    adminUserId: ObjectId,
    bannedUserEmail: string,
    bannedUserId: ObjectId,
    banReason: string,
    banDays: number,
    ipAddress: string | undefined
  ): void;

  /**
   * Log a failed user account ban event.
   * @param adminUserEmail - The email of the admin performing the action.
   * @param adminUserId - The ID of the admin performing the action.
   * @param bannedUserEmail - The email of the banned user.
   * @param bannedUserId - The ID of the banned user.
   * @param banReason - The reason for banning the user.
   * @param banDays - The duration of the ban in days.
   * @param ipAddress - The IP address of the admin performing the action (optional).
   * @param errorMessage - The error message explaining why the action failed.
   */
  logFailedBanUserAccount(
    adminUserEmail: string,
    adminUserId: ObjectId,
    bannedUserEmail: string,
    bannedUserId: ObjectId,
    banReason: string,
    banDays: number,
    ipAddress: string | undefined,
    errorMessage: string
  ): void;

  /**
   * Log a successful user account unban event.
   * @param adminUserEmail - The email of the admin performing the action.
   * @param adminUserId - The ID of the admin performing the action.
   * @param unbannedUserEmail - The email of the unbanned user.
   * @param unbannedUserId - The ID of the unbanned user.
   * @param ipAddress - The IP address of the admin performing the action (optional).
   * @param adminUnbanComment - The admin's comment about the unban action.
   */
  logSuccessUnbanUserAccount(
    adminUserEmail: string,
    adminUserId: ObjectId | string,
    unbannedUserEmail: string,
    unbannedUserId: ObjectId,
    ipAddress: string | undefined,
    adminUnbanComment: string
  ): void;

  /**
   * Log a failed user account unban event.
   * @param adminUserEmail - The email of the admin performing the action.
   * @param adminUserId - The ID of the admin performing the action.
   * @param unbannedUserEmail - The email of the unbanned user.
   * @param unbannedUserId - The ID of the unbanned user.
   * @param ipAddress - The IP address of the admin performing the action (optional).
   * @param adminUnbanComment - The admin's comment about the unban action.
   * @param errorMessage - The error message explaining why the action failed.
   */
  logFailedUnbanUserAccount(
    adminUserEmail: string,
    adminUserId: ObjectId | string,
    unbannedUserEmail: string,
    unbannedUserId: ObjectId,
    ipAddress: string | undefined,
    adminUnbanComment: string,
    errorMessage: string
  ): void;
}
