import { ObjectId } from "mongoose";

/**
 * Interface for logging email verification events.
 */
export interface IEmailsVerificationsLogger {
  /**
   * Log a failed attempt to verify a user's email.
   * @param userEmail - The email address of the user whose email verification failed.
   * @param user_id - The ID of the user whose email verification failed.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param errMessage - The error message explaining why the email verification failed.
   */
  logFailedEmailVerification(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date,
    errMessage: string
  ): void;

  /**
   * Log a successful email verification for a user.
   * @param userEmail - The email address of the user whose email was successfully verified.
   * @param user_id - The ID of the user whose email was verified.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param emailVerifiedAt - The date and time when the user's email was verified.
   */
  logSuccessfulEmailVerification(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date,
    emailVerifiedAt: Date
  ): void;

  /**
   * Log a successful resend of the email verification email.
   * @param userEmail - The email address of the user for whom the verification email was resent.
   * @param user_id - The ID of the user for whom the email verification was resent.
   * @param userJoinedAt - The date when the user joined the platform.
   */
  logSuccessfulEmailResend(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date
  ): void;

  /**
   * Log a failed attempt to resend the email verification email.
   * @param userEmail - The email address of the user for whom the email verification was supposed to be resent.
   * @param user_id - The ID of the user for whom the email verification resend failed.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param errMessage - The error message explaining why the resend failed.
   */
  logFailedEmailResend(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date,
    errMessage: string
  ): void;
}
