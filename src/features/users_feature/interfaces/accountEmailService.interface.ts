import { IUser } from "@features/users_feature/interfaces/user.interface";

/**
 * Interface for the AccountEmailService.
 * Defines the methods for managing user email change requests and confirmations.
 */
export interface IAccountEmailService {
  /**
   * Handles the request to change the user's email address.
   *
   * Generates a verification token for the current email and updates the user with the new email address.
   * Queues a background job to send an email notification to the user about the email change request.
   *
   * @param user - The user object whose email is being changed.
   * @param newEmail - The new email address the user wants to change to.
   * @param ipAddress - The IP address of the user making the request (can be undefined).
   *
   * @throws AppError - If an error occurs during the request processing.
   *
   * @returns A promise that resolves once the request is processed successfully.
   */
  requestEmailChange(
    user: IUser,
    newEmail: string,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Confirms the email change by validating the token sent to the current email.
   *
   * This method sends a verification token to the new email and confirms the email change.
   * It queues a background job to send the confirmation email to the user.
   *
   * @param user - The user object whose email change is being confirmed.
   * @param ipAddress - The IP address of the user confirming the email change (can be undefined).
   *
   * @throws AppError - If an error occurs during the confirmation processing.
   *
   * @returns A promise that resolves once the confirmation is processed successfully.
   */
  confirmEmailChange(user: IUser, ipAddress: string | undefined): Promise<void>;

  /**
   * Resends the verification token to the new email address.
   *
   * This method generates a new token and sends it to the new email to verify its ownership.
   * It queues a background job to send the email notification to the user.
   *
   * @param user - The user object whose email verification token is being resent.
   * @param ipAddress - The IP address of the user making the request (can be undefined).
   *
   * @throws AppError - If an error occurs while resending the verification token.
   *
   * @returns A promise that resolves once the resend request is processed successfully.
   */
  resendNewEmailVerificationToken(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Verifies ownership of the new email by validating the token sent to the new email.
   *
   * This method updates the user's email address to the new one and locks the email change for 24 hours.
   * It also queues a background job to notify the user about the successful email change.
   *
   * @param user - The user object whose new email ownership is being verified.
   * @param ipAddress - The IP address of the user verifying the new email ownership (can be undefined).
   *
   * @throws AppError - If an error occurs during the verification process.
   *
   * @returns A promise that resolves once the email verification is completed successfully.
   */
  verifyNewEmailOwnership(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;
}
