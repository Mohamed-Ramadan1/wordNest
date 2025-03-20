import { ObjectId } from "mongoose";

/**
 * Interface for logging account deletion events.
 */
export interface IAccountDeletionLogger {
  /**
   * Logs a successful account deletion request.
   *
   * @param ipAddress - The IP address from which the request was made.
   * @param userEmail - The email of the user requesting account deletion.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param requestedAt - The date and time when the deletion request was made.
   */
  logSuccessfulAccountDeletionRequest(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    requestedAt: Date
  ): void;

  /**
   * Logs a failed account deletion request.
   *
   * @param userEmail - The email of the user requesting account deletion.
   * @param ipAddress - The IP address from which the request was made.
   * @param userId - The unique identifier of the user.
   * @param error - The error encountered while processing the request.
   */
  logFailedAccountDeletionRequest(
    userEmail: string,
    ipAddress: string,
    userId: ObjectId,
    error: Error
  ): void;

  /**
   * Logs a successful account deletion confirmation.
   *
   * @param ipAddress - The IP address from which the confirmation was made.
   * @param userEmail - The email of the user whose account was deleted.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param confirmedAt - The date and time when the deletion was confirmed.
   * @param requestedAt - The date and time when the deletion request was made.
   * @param actualDeletionDate - The date when the account was actually deleted.
   */
  logSuccessfulAccountDeletionConfirmation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    confirmedAt: Date,
    requestedAt: Date,
    actualDeletionDate: Date
  ): void;

  /**
   * Logs a failed account deletion confirmation.
   *
   * @param userEmail - The email of the user whose account deletion failed.
   * @param ipAddress - The IP address from which the confirmation was made.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param confirmedAt - The date and time when the deletion was confirmed.
   * @param errorMessage - The error message encountered during deletion.
   */
  logFailedAccountDeletionConfirmation(
    userEmail: string,
    ipAddress: string,
    userId: ObjectId,
    userJoinedAt: Date,
    confirmedAt: Date,
    errorMessage: string
  ): void;
}
