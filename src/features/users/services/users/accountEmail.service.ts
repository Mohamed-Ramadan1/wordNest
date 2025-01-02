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
  static async confirmEmailChange(user: IUser) {
    // Logic to confirm email change
  }

  /**
   * Resend the verification token to the new email address.
   */
  static async resendNewEmailVerificationToken(user: IUser) {
    // Logic to resend the token to the new email
  }

  /**
   * Verifies ownership of the new email by validating the token sent to the new email.
   * Updates the email in the user's account upon success.
   */
  static async verifyNewEmailOwnership(user: IUser) {
    // Logic to verify ownership of the new email
  }
}
