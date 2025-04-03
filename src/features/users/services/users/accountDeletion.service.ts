// packages imports
import { inject, injectable } from "inversify";
// Shared imports
import { IErrorUtils, TYPES } from "@shared/index";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

// logging imports
import { IAccountDeletionLogger } from "@logging/interfaces";
// queues imports
import {
  emailQueue,
  deleteUserAccountQueue,
  DeleteUserAccountQueueJobs,
  EmailQueueJobs,
} from "@jobs/index";

// config imports
// interfaces imports
import {
  IAccountDeletionService,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountDeletionService implements IAccountDeletionService {
  constructor(
    @inject(TYPES.AccountDeletionLogger)
    private readonly accountDeletionLogger: IAccountDeletionLogger,
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  // Account Deletion
  public async requestAccountDeletion(
    user: IUser,
    ipAddress: string | undefined
  ) {
    // Logic to handle account deletion request
    try {
      await this.userSelfRepository.saveAccountDeletionRequest(user);

      this.accountDeletionLogger.logSuccessfulAccountDeletionRequest(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        user.lastDeleteAccountRequestAt as Date
      );
      emailQueue.add(EmailQueueJobs.DeleteAccountRequest, { user });
    } catch (err: any) {
      this.accountDeletionLogger.logFailedAccountDeletionRequest(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }

  public async confirmAccountDeletion(
    user: IUser,
    ipAddress: string | undefined
  ) {
    try {
      const userAccountDeletedAt =
        await this.userSelfRepository.deletionRequestConfirmation(user);
      // email queue for successful account deletion
      emailQueue.add(EmailQueueJobs.DeleteAccountConfirm, { user });

      // queue for deleting user account
      deleteUserAccountQueue.add(
        DeleteUserAccountQueueJobs.DeleteUserAccount,
        {
          user,
        },
        {
          delay: userAccountDeletedAt.getTime() - Date.now(),
        }
      );
      // logging the process of successfully user account deletion confirmation.
      this.accountDeletionLogger.logSuccessfulAccountDeletionConfirmation(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        user.deleteAccountConfirmedAt as Date,
        user.lastDeleteAccountRequestAt as Date,
        user.userAccountDeletedAt as Date
      );
    } catch (err: any) {
      this.accountDeletionLogger.logFailedAccountDeletionConfirmation(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        user.deleteAccountConfirmedAt as Date,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }
}
