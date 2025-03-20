import { ObjectId } from "mongoose";

/**
 * Interface for logging account locking and unlocking events.
 */
export interface ILockAccountsLogger {
  /**
   * Log a failed attempt to lock a user account.
   * @param lockedEmail - The email address of the user whose account locking failed.
   * @param reason - The reason for locking the account.
   * @param userId - The ID of the user whose account locking failed.
   * @param lockedByEmail - The email address of the person who attempted to lock the account.
   * @param lockedById - The ID of the person who attempted to lock the account.
   * @param errorMessage - The error message explaining why the account locking failed.
   * @param ipAddress - The IP address from which the account lock attempt was made (optional).
   */
  logFailedLockAccount(
    lockedEmail: string,
    reason: string,
    userId: ObjectId,
    lockedByEmail: string,
    lockedById: ObjectId,
    errorMessage: string,
    ipAddress: string | undefined
  ): void;

  /**
   * Log a successful account locking event.
   * @param lockedEmail - The email address of the user whose account was successfully locked.
   * @param userId - The ID of the user whose account was successfully locked.
   * @param lockedByEmail - The email address of the person who locked the account.
   * @param lockedById - The ID of the person who locked the account.
   * @param ipAddress - The IP address from which the account was locked (optional).
   */
  logSuccessfulLockAccount(
    lockedEmail: string,
    userId: ObjectId,
    lockedByEmail: string,
    lockedById: ObjectId,
    ipAddress: string | undefined
  ): void;

  /**
   * Log a successful account unlocking event.
   * @param email - The email address of the user whose account was successfully unlocked.
   * @param userId - The ID of the user whose account was successfully unlocked.
   * @param unlockedByEmail - The email address of the person who unlocked the account.
   * @param unlockedById - The ID of the person who unlocked the account.
   * @param ipAddress - The IP address from which the account was unlocked (optional).
   */
  logSuccessfulUnlockAccount(
    email: string,
    userId: ObjectId,
    unlockedByEmail: string,
    unlockedById: ObjectId,
    ipAddress: string | undefined
  ): void;

  /**
   * Log a failed attempt to unlock a user account.
   * @param email - The email address of the user whose account unlocking failed.
   * @param userId - The ID of the user whose account unlocking failed.
   * @param unlockedByEmail - The email address of the person who attempted to unlock the account.
   * @param unlockedById - The ID of the person who attempted to unlock the account.
   * @param errorMessage - The error message explaining why the account unlocking failed.
   * @param ipAddress - The IP address from which the account unlock attempt was made (optional).
   */
  logFailedUnlockAccount(
    email: string,
    userId: ObjectId,
    unlockedByEmail: string,
    unlockedById: ObjectId,
    errorMessage: string,
    ipAddress: string | undefined
  ): void;
}
