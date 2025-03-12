// packages imports
import { inject, injectable } from "inversify";

// utils imports
import { handleServiceError, TYPES } from "@shared/index";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";
// jobs imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";
// config imports

// logger imports
import { IChangeAccountEmailLogger } from "@logging/interfaces";

// interfaces imports
import {
  IAccountEmailService,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountEmailService implements IAccountEmailService {
  constructor(
    @inject(TYPES.ChangeAccountEmailLogger)
    private readonly changeAccountEmailLogger: IChangeAccountEmailLogger,
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository
  ) {}
  /**
   * Handles the request to change the user's email address.
   * Generates a verification token for the current email.
   */

  public async requestEmailChange(
    user: IUser,
    newEmail: string,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      this.userSelfRepository.saveEmailChangeRequest(user, newEmail);
      // add background job to send email notification
      emailQueue.add(EmailQueueJobs.ChangeAccountEmailRequest, {
        user,
      });
      // log successful email change request
      this.changeAccountEmailLogger.logSuccessRequestChangeAccountEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "Unknown IP address",
        user.lastChangeEmailRequestAt as Date
      );
    } catch (err: any) {
      this.changeAccountEmailLogger.logFailedRequestChangeAccountEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "Unknown IP address",
        err.message
      );
      handleServiceError(err);
    }
  }

  /**
   * Confirms the email change by validating the token sent to the current email.
   * Sends a verification token to the new email upon success.
   */
  public async confirmEmailChange(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      this.userSelfRepository.confirmEmailChangeStatus(user);
      // add background job to send email notification
      emailQueue.add(EmailQueueJobs.NewAccountConfirmationEmail, {
        user,
      });

      // log successful email change confirmation
      this.changeAccountEmailLogger.logSuccessConfirmEmailChange(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        user.changeEmailRequestConfirmedAt as Date
      );
    } catch (err: any) {
      this.changeAccountEmailLogger.logFailedConfirmEmailChange(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        err.message
      );
      handleServiceError(err);
    }
  }

  /**
   * Resend the verification token to the new email address.
   */
  public async resendNewEmailVerificationToken(
    user: IUser,
    ipAddress: string | undefined
  ) {
    try {
      this.userSelfRepository.resendNewEmailVerificationToken(user);
      // add background job to send email notification
      emailQueue.add(EmailQueueJobs.NewAccountConfirmationEmail, {
        user,
      });
      // log successful email change request
      this.changeAccountEmailLogger.logSuccessResendEmailVerificationToken(
        user.email,
        user._id,
        new Date(),
        ipAddress ? ipAddress : "unknown ip address"
      );
    } catch (err: any) {
      this.changeAccountEmailLogger.logFailedResendEmailVerificationToken(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        err.message
      );
      handleServiceError(err);
    }
  }

  /**
   * Verifies ownership of the new email by validating the token sent to the new email.
   * Updates the email in the user's account upon success.
   */
  public async verifyNewEmailOwnership(
    user: IUser,
    ipAddress: string | undefined
  ) {
    try {
      this.userSelfRepository.verifyNewEmailOwnership(user);
      // add background job to send email notification
      emailQueue.add(EmailQueueJobs.ChangeAccountEmailChangeSuccess, {
        user,
      });
      // log successful email change
      this.changeAccountEmailLogger.logSuccessChangeUserEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        new Date()
      );
    } catch (err: any) {
      this.changeAccountEmailLogger.logFailedChangeUserEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        err.message
      );
      handleServiceError(err);
    }
  }
}
