import { ObjectId } from "mongoose";

/**
 * Interface for logging account email change events in the system.
 */
export interface IChangeAccountEmailLogger {
  /**
   * Log a successful email change request.
   * @param userEmail - The email address of the user making the request.
   * @param userId - The ID of the user requesting the email change.
   * @param ipAddress - The IP address from which the request was made.
   * @param requestedAt - The timestamp when the request was made.
   */
  logSuccessRequestChangeAccountEmail(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    requestedAt: Date
  ): void;

  /**
   * Log a failed email change request.
   * @param userEmail - The email address of the user making the request.
   * @param userId - The ID of the user requesting the email change.
   * @param ipAddress - The IP address from which the request was made.
   * @param errorMessage - The error message explaining why the request failed.
   */
  logFailedRequestChangeAccountEmail(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ): void;

  /**
   * Log a successful email change confirmation.
   * @param userEmail - The email address of the user confirming the change.
   * @param userId - The ID of the user confirming the change.
   * @param ipAddress - The IP address from which the confirmation was made.
   * @param confirmedAt - The timestamp when the email change was confirmed.
   */
  logSuccessConfirmEmailChange(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    confirmedAt: Date
  ): void;

  /**
   * Log a failed email change confirmation.
   * @param userEmail - The email address of the user attempting to confirm the change.
   * @param userId - The ID of the user attempting to confirm the change.
   * @param ipAddress - The IP address from which the confirmation attempt was made.
   * @param errorMessage - The error message explaining why the confirmation failed.
   */
  logFailedConfirmEmailChange(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ): void;

  /**
   * Log a successful change of the user's email address.
   * @param userEmail - The new email address of the user.
   * @param userId - The ID of the user who changed the email.
   * @param ipAddress - The IP address from which the email change was made.
   * @param changedAt - The timestamp when the email was changed.
   */
  logSuccessChangeUserEmail(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    changedAt: Date
  ): void;

  /**
   * Log a failed attempt to change the user's email address.
   * @param userEmail - The new email address of the user.
   * @param userId - The ID of the user who attempted the email change.
   * @param ipAddress - The IP address from which the email change attempt was made.
   * @param errorMessage - The error message explaining why the email change failed.
   */
  logFailedChangeUserEmail(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ): void;

  /**
   * Log a successful email verification token resend event.
   * @param userEmail - The email address of the user requesting the resend.
   * @param userId - The ID of the user requesting the resend.
   * @param userJoinedAt - The timestamp when the user joined the system.
   * @param ipAddress - The IP address from which the resend request was made.
   */
  logSuccessResendEmailVerificationToken(
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    ipAddress: string
  ): void;

  /**
   * Log a failed attempt to resend the email verification token.
   * @param userEmail - The email address of the user requesting the resend.
   * @param userId - The ID of the user requesting the resend.
   * @param ipAddress - The IP address from which the resend request was made.
   * @param errorMessage - The error message explaining why the resend failed.
   */
  logFailedResendEmailVerificationToken(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ): void;
}
