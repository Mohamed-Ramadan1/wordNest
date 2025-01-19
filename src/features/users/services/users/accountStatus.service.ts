// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

// queues imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// logs imports
import {
  logSuccessfulAccountDeactivationConfirmation,
  logFailedAccountDeactivationConfirmation,
  logFailedAccountDeactivationRequest,
  logSuccessfulAccountDeactivationRequest,
  logFailedAccountActivation,
  logSuccessfulAccountActivation,
} from "@logging/index";
export class AccountStatusService {
  // Logic to deactivate  account request.
  static async deactivateAccountReq(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      user.createDeactivationAccountToken();
      await user.save();

      emailQueue.add(EmailQueueJobs.DeactivateAccountRequest, {
        user,
      });
      logSuccessfulAccountDeactivationRequest(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        new Date()
      );
    } catch (err: any) {
      logFailedAccountDeactivationRequest(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }

  // Logic for account deactivate confirmation.
  static async deactivateAccountConfirmation(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      user.isActive = false;
      user.deactivationAccountToken = undefined;
      user.deactivationAccountTokenExpiredAt = undefined;
      user.lastDeactivationRequestAt = undefined;
      await user.save();

      // send email to user to confirm account deactivation.
      emailQueue.add(EmailQueueJobs.DeactivateAccountConfirmation, { user });

      // log success account deactivation confirmation.
      logSuccessfulAccountDeactivationConfirmation(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        new Date()
      );
    } catch (err: any) {
      // log failed account deactivation confirmation.
      logFailedAccountDeactivationConfirmation(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }

  // Logic to activate the account
  static async activateAccount(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      user.isActive = true;
      user.reactivationAccountToken = undefined;
      user.reactivationAccountTokenExpiredAt = undefined;
      user.reactivationRequestCount = 0;
      user.lastReactivationRequestAt = undefined;
      await user.save();

      // send email to user to confirm account activation.
      emailQueue.add(EmailQueueJobs.ReactivateAccountSuccess, { user });
      // log success account activation.
      logSuccessfulAccountActivation(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        new Date()
      );
    } catch (err: any) {
      // log failed account activation.
      logFailedAccountActivation(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }
}
