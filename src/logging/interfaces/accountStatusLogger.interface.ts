import { ObjectId } from "mongoose";

/**
 * Interface for logging account status events, including activation and deactivation.
 */
export interface IAccountStatusLogger {
  /**
   * Logs a successful account deactivation request.
   *
   * @param ipAddress - The IP address from which the request was made.
   * @param userEmail - The email of the user requesting account deactivation.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param requestedAt - The date and time when the deactivation request was made.
   */
  logSuccessfulAccountDeactivationRequest(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    requestedAt: Date
  ): void;

  /**
   * Logs a successful account deactivation confirmation.
   *
   * @param ipAddress - The IP address from which the confirmation was made.
   * @param userEmail - The email of the user whose account was deactivated.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param confirmedAt - The date and time when the deactivation was confirmed.
   */
  logSuccessfulAccountDeactivationConfirmation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    confirmedAt: Date
  ): void;

  /**
   * Logs a failed account deactivation request.
   *
   * @param userEmail - The email of the user requesting account deactivation.
   * @param ipAddress - The IP address from which the request was made.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param errorMessage - The error message encountered during the request.
   */
  logFailedAccountDeactivationRequest(
    userEmail: string,
    ipAddress: string,
    userId: ObjectId,
    userJoinedAt: Date,
    errorMessage: string
  ): void;

  /**
   * Logs a failed account deactivation confirmation.
   *
   * @param ipAddress - The IP address from which the confirmation attempt was made.
   * @param userEmail - The email of the user whose account deactivation failed.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param errorMessage - The error message encountered during the confirmation.
   */
  logFailedAccountDeactivationConfirmation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    errorMessage: string
  ): void;

  /**
   * Logs a successful account activation.
   *
   * @param ipAddress - The IP address from which the activation was made.
   * @param userEmail - The email of the user whose account was activated.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param activatedAt - The date and time when the account was activated.
   */
  logSuccessfulAccountActivation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    activatedAt: Date
  ): void;

  /**
   * Logs a failed account activation attempt.
   *
   * @param ipAddress - The IP address from which the activation attempt was made.
   * @param userEmail - The email of the user whose account activation failed.
   * @param userId - The unique identifier of the user.
   * @param userJoinedAt - The date when the user joined the platform.
   * @param errorMessage - The error message encountered during activation.
   */
  logFailedAccountActivation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    errorMessage: string
  ): void;
}
