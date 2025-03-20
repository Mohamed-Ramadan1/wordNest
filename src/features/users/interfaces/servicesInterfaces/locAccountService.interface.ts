import { IUser } from "../user.interface";
export interface ILockAccountService {
  /**
   * Locks a user account.
   * Temporarily restricts access to the account for a specified period.
   * @param userToBeLocked - The user whose account is to be locked.
   * @param lockReason - The reason for locking the account.
   * @param ipAddress - The IP address of the admin performing the action.
   * @param adminUser - The admin user executing the lock action.
   * @throws {AppError} If an error occurs while locking the account.
   */
  lockAccount(
    userToBeLocked: IUser,
    lockReason: string,
    ipAddress: string | undefined,
    adminUser: IUser
  ): Promise<void>;

  /**
   * Unlocks a user account.
   * Restores access to the account by removing the lock status.
   * @param userToBeUnlock - The user whose account is to be unlocked.
   * @param unLockComment - A comment explaining the reason for unlocking.
   * @param ipAddress - The IP address of the admin performing the action.
   * @param adminUser - The admin user executing the unlock action.
   * @throws {AppError} If an error occurs while unlocking the account.
   */
  unlockAccount(
    userToBeUnlock: IUser,
    unLockComment: string,
    ipAddress: string | undefined,
    adminUser: IUser
  ): Promise<void>;
}
