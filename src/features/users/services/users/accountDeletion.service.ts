// models imports
import UserModel from "../../models/user.model";

// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

// logging imports
import {
  logFailedAccountDeletionConfirmation,
  logFailedAccountDeletionRequest,
  logSuccessfulAccountDeletionConfirmation,
  logSuccessfulAccountDeletionRequest,
} from "@logging/loggers/accountDeletionLogger";

// queues imports
import {
  emailQueue,
  deleteUserAccountQueue,
  DeleteUserAccountQueueType,
} from "@jobs/index";

// config imports
import { EmailQueueType } from "@config/emailQueue.config";

export class AccountDeletionService {
  // Account Deletion
  static async requestAccountDeletion(
    user: IUser,
    ipAddress: string | undefined
  ) {
    // Logic to handle account deletion request
    try {
      user.createDeleteAccountRequestToken();
      await user.save();
      logSuccessfulAccountDeletionRequest(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        user.lastDeleteAccountRequestAt as Date
      );
      emailQueue.add(EmailQueueType.DeleteAccountRequest, { user });
    } catch (err: any) {
      logFailedAccountDeletionRequest(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        err.message
      );
      throw new AppError(
        "An error occurred while processing your request. Please try again.",
        500
      );
    }
  }

  static async confirmAccountDeletion(
    user: IUser,
    ipAddress: string | undefined
  ) {
    try {
      user.userAccountToBeDeleted = true;
      user.deleteAccountConfirmedAt = new Date();
      const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days * hours * minutes * seconds * milliseconds
      // const thirtyDaysInMilliseconds = 1 * 60 * 1000; // 3 minutes * 60 seconds * 1000 milliseconds

      // Create a new Date object with the calculated timestamp (30 days from now)
      user.userAccountDeletedAt = new Date(
        new Date().getTime() + thirtyDaysInMilliseconds
      );

      // save the user document
      await user.save();

      // email queue for successful account deletion
      emailQueue.add(EmailQueueType.DeleteAccountConfirm, { user });

      // queue for deleting user account
      deleteUserAccountQueue.add(
        DeleteUserAccountQueueType.DeleteUserAccount,
        {
          user,
        },
        {
          delay: user.userAccountDeletedAt.getTime() - Date.now(),
        }
      );
      // logging the process of successfully user account deletion confirmation.
      logSuccessfulAccountDeletionConfirmation(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        user.deleteAccountConfirmedAt as Date,
        user.lastDeleteAccountRequestAt as Date,
        user.userAccountDeletedAt as Date
      );
    } catch (err: any) {
      logFailedAccountDeletionConfirmation(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        user.deleteAccountConfirmedAt as Date,
        err.message
      );
      throw new AppError(
        "An error occurred while processing your request. Please try again.",
        500
      );
    }
  }
}
