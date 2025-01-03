// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";
// jobs imports
import { emailQueue } from "@jobs/queues/emailsQueue";
// config imports
import { EmailQueueType } from "@config/emailQueue.config";

// logger imports
import { changeAccountEmailLogger } from "@logging/index";
export class AccountEmailService {
  /**
   * Handles the request to change the user's email address.
   * Generates a verification token for the current email.
   */
  static async requestEmailChange(
    user: IUser,
    newEmail: string,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      user.createChangeEmailRequestToken();
      user.tempChangedEmail = newEmail;
      await user.save();

      // add background job to send email notification
      emailQueue.add(EmailQueueType.ChangeAccountEmailRequest, {
        user,
      });
      // log successful email change request
      changeAccountEmailLogger.logSuccessRequestChangeAccountEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "Unknown IP address",
        user.lastChangeEmailRequestAt as Date
      );
    } catch (err: any) {
      changeAccountEmailLogger.logFailedRequestChangeAccountEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "Unknown IP address",
        err.message
      );
      throw new AppError(
        "Failed to request email change,please tray again.",
        500
      );
    }
  }

  /**
   * Confirms the email change by validating the token sent to the current email.
   * Sends a verification token to the new email upon success.
   */
  static async confirmEmailChange(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      user.changeEmailRequestToken = undefined;
      user.changeEmailVerificationTokenExpiresAt = undefined;
      user.changeEmailRequestConfirmedAt = new Date();
      user.isChangeEmailRequestConfirmed = true;
      user.createTempChangedEmailVerificationToken();
      await user.save();
      // add background job to send email notification
      emailQueue.add(EmailQueueType.NewAccountConfirmationEmail, {
        user,
      });

      // log successful email change confirmation
      changeAccountEmailLogger.logSuccessConfirmEmailChange(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        user.changeEmailRequestConfirmedAt as Date
      );
    } catch (err: any) {
      changeAccountEmailLogger.logFailedConfirmEmailChange(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        err.message
      );
      throw new AppError(
        "Failed to confirm email change, please try again.",
        500
      );
    }
  }

  /**
   * Resend the verification token to the new email address.
   */
  static async resendNewEmailVerificationToken(
    user: IUser,
    ipAddress: string | undefined
  ) {
    try {
      user.createTempChangedEmailVerificationToken();
      await user.save();
      // add background job to send email notification
      emailQueue.add(EmailQueueType.NewAccountConfirmationEmail, {
        user,
      });
      // log successful email change request
      changeAccountEmailLogger.logSuccessResendEmailVerificationToken(
        user.email,
        user._id,
        new Date(),
        ipAddress ? ipAddress : "unknown ip address"
      );
    } catch (err: any) {
      changeAccountEmailLogger.logFailedResendEmailVerificationToken(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        err.message
      );
      throw new AppError(
        "Failed to resend email verification token, please try again.",
        500
      );
    }
  }

  /**
   * Verifies ownership of the new email by validating the token sent to the new email.
   * Updates the email in the user's account upon success.
   */
  static async verifyNewEmailOwnership(
    user: IUser,
    ipAddress: string | undefined
  ) {
    try {
      user.resetChangeEmailRequestToken();
      user.resetTempChangedEmailVerificationToken();
      user.previousEmails.push({
        email: user.email,
        changedAt: new Date(),
      });

      if (user.tempChangedEmail) {
        user.email = user.tempChangedEmail;
      } else {
        throw new AppError("New email address not found .", 400);
      }
      user.emailChangeLockedUntil = new Date(Date.now() + 1000 * 60 * 60 * 24);
      user.tempChangedEmail = undefined;

      await user.save();
      // add background job to send email notification
      emailQueue.add(EmailQueueType.ChangeAccountEmailChangeSuccess, {
        user,
      });
      // log successful email change
      changeAccountEmailLogger.logSuccessChangeUserEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        new Date()
      );
    } catch (err: any) {
      changeAccountEmailLogger.logFailedChangeUserEmail(
        user.email,
        user._id,
        ipAddress ? ipAddress : "unknown ip address",
        err.message
      );
      throw new AppError(
        "Failed to verify new email ownership, please try again.",
        500
      );
    }
  }
}
