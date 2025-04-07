//packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { TYPES, IErrorUtils } from "@shared/index";

// queues imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// logger imports
import { ILockAccountsLogger } from "@logging/interfaces";

// interfaces imports
import {
  ILockAccountService,
  IUserManagementRepository,
} from "../../interfaces/index";

@injectable()
export class LockAccountService implements ILockAccountService {
  constructor(
    @inject(TYPES.LockAccountsLogger)
    private readonly lockAccountsLogger: ILockAccountsLogger,
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
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
      await this.userManagementRepository.lockAccount(
        userToBeLocked,
        lockReason,
        adminUser
      );
      // adding locked confirmation email to the email queue
      emailQueue.add(EmailQueueJobs.LockUserAccount, {
        user: userToBeLocked,
      });
      // log the successful lock account attempt
      this.lockAccountsLogger.logSuccessfulLockAccount(
        userToBeLocked.email,
        userToBeLocked._id,
        adminUser.email,
        adminUser._id,
        ipAddress ? ipAddress : "unknown ip address"
      );
    } catch (err: any) {
      // log the failed lock account attempt
      this.lockAccountsLogger.logFailedLockAccount(
        userToBeLocked.email,
        lockReason,
        userToBeLocked._id,
        adminUser.email,
        adminUser._id,
        err.message,
        ipAddress
      );
      this.errorUtils.handleServiceError(err);
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
      await this.userManagementRepository.unlockAccount(
        userToBeUnlock,
        unLockComment,
        adminUser
      );

      // adding unlocked confirmation email to the email queue
      emailQueue.add(EmailQueueJobs.UnlockUserAccount, {
        user: userToBeUnlock,
      });

      // log the successful unlock account attempt
      this.lockAccountsLogger.logSuccessfulUnlockAccount(
        userToBeUnlock.email,
        userToBeUnlock._id,
        adminUser.email,
        adminUser._id,
        ipAddress
      );
    } catch (err: any) {
      // log the failed unlock account attempt
      this.lockAccountsLogger.logFailedUnlockAccount(
        userToBeUnlock.email,
        userToBeUnlock._id,
        adminUser.email,
        adminUser._id,
        err.message,
        ipAddress
      );
      this.errorUtils.handleServiceError(err);
    }
  }
}
