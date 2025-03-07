// interfaces imports
import { IUser } from "@features/users_feature/interfaces/user.interface";

// utils imports
import { AppError } from "@utils/appError";

// queues imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// logging imports
import { lockAccountsLogger } from "@logging/index";

// interfaces imports
import { ILockAccountService } from "../../interfaces/index";
export class LockAccountService implements ILockAccountService {
  /**
   * Locks a user account.
   * Temporarily restricts access to the account for a specified period.
   */
  public async lockAccount(
    userToBeLocked: IUser,
    lockReason: string,
    ipAddress: string | undefined,
    adminUser: IUser
  ): Promise<void> {
    try {
      userToBeLocked.isAccountLocked = true;
      userToBeLocked.accountLockedReason = lockReason;
      userToBeLocked.accountLockedAt = new Date();
      userToBeLocked.accountLockedByAdminEmail = adminUser.email;
      await userToBeLocked.save();
      // adding locked confirmation email to the email queue
      emailQueue.add(EmailQueueJobs.LockUserAccount, {
        user: userToBeLocked,
      });
      // log the successful lock account attempt
      lockAccountsLogger.logSuccessfulLockAccount(
        userToBeLocked.email,
        userToBeLocked._id,
        adminUser.email,
        adminUser._id,
        ipAddress ? ipAddress : "unknown ip address"
      );
    } catch (err: any) {
      // log the failed lock account attempt
      lockAccountsLogger.logFailedLockAccount(
        userToBeLocked.email,
        lockReason,
        userToBeLocked._id,
        adminUser.email,
        adminUser._id,
        err.message,
        ipAddress
      );
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Unlocks a user account.
   * Restores access to the account by removing the lock status.
   */
  public async unlockAccount(
    userToBeUnlock: IUser,
    unLockComment: string,
    ipAddress: string | undefined,
    adminUser: IUser
  ): Promise<void> {
    try {
      userToBeUnlock.accountLockedAt = new Date();
      userToBeUnlock.accountUnlockedBy = adminUser.email;
      userToBeUnlock.accountUnlockedComment = unLockComment;
      userToBeUnlock.isAccountLocked = false;
      await userToBeUnlock.save();

      // adding unlocked confirmation email to the email queue
      emailQueue.add(EmailQueueJobs.UnlockUserAccount, {
        user: userToBeUnlock,
      });

      // log the successful unlock account attempt
      lockAccountsLogger.logSuccessfulUnlockAccount(
        userToBeUnlock.email,
        userToBeUnlock._id,
        adminUser.email,
        adminUser._id,
        ipAddress
      );
    } catch (err: any) {
      // log the failed unlock account attempt
      lockAccountsLogger.logFailedUnlockAccount(
        userToBeUnlock.email,
        userToBeUnlock._id,
        adminUser.email,
        adminUser._id,
        err.message,
        ipAddress
      );
      throw new AppError(err.message, 500);
    }
  }
}
