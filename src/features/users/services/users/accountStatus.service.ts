// packages imports
import { inject, injectable } from "inversify";

// Shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

// queues imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

import { IAccountStatusLogger } from "@logging/interfaces";

import {
  IAccountStatusService,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountStatusService implements IAccountStatusService {
  constructor(
    @inject(TYPES.AccountStatusLogger)
    private readonly accountStatusLogger: IAccountStatusLogger,
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  // Logic to deactivate  account request.
  public async deactivateAccountReq(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      this.userSelfRepository.saveAccountDeactivationRequest(user);

      emailQueue.add(EmailQueueJobs.DeactivateAccountRequest, {
        user,
      });
      this.accountStatusLogger.logSuccessfulAccountDeactivationRequest(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        new Date()
      );
    } catch (err: any) {
      this.accountStatusLogger.logFailedAccountDeactivationRequest(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }

  // Logic for account deactivate confirmation.
  public async deactivateAccountConfirmation(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      this.userSelfRepository.updateDeactivationRequestConfirmed(user);
      // send email to user to confirm account deactivation.
      emailQueue.add(EmailQueueJobs.DeactivateAccountConfirmation, { user });

      // log success account deactivation confirmation.
      this.accountStatusLogger.logSuccessfulAccountDeactivationConfirmation(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        new Date()
      );
    } catch (err: any) {
      // log failed account deactivation confirmation.
      this.accountStatusLogger.logFailedAccountDeactivationConfirmation(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }

  // Logic to activate the account
  public async activateAccount(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      this.userSelfRepository.activateAccount(user);
      // send email to user to confirm account activation.
      emailQueue.add(EmailQueueJobs.ReactivateAccountSuccess, { user });
      // log success account activation.
      this.accountStatusLogger.logSuccessfulAccountActivation(
        ipAddress ? ipAddress : "unknown ip address",
        user.email,
        user._id,
        user.createdAt,
        new Date()
      );
    } catch (err: any) {
      // log failed account activation.
      this.accountStatusLogger.logFailedAccountActivation(
        user.email,
        ipAddress ? ipAddress : "unknown ip address",
        user._id,
        user.createdAt,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }
}
