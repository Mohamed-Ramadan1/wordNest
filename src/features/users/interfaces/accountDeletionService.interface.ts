import { IUser } from "@features/users/interfaces/user.interface";

/**
 * Interface for the AccountDeletionService.
 * Defines the methods for requesting and confirming account deletion for users.
 */
export interface IAccountDeletionService {
  /**
   * Handles the account deletion request process for a user.
   *
   * This method generates a token for the account deletion request and queues an email to notify
   * the user about the request. It logs success and failure events.
   *
   * @param user - The user object for which the account deletion is requested.
   * @param ipAddress - The IP address of the user making the request (can be undefined).
   *
   * @throws AppError - If an error occurs during the request processing.
   *
   * @returns A promise that resolves once the request is processed successfully.
   */
  requestAccountDeletion(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Confirms the account deletion process for a user.
   *
   * This method updates the user’s account status to be deleted, sets the deletion confirmation time,
   * and schedules the account deletion after a period of 30 days. It also queues an email and job
   * to handle the final account deletion. It logs success and failure events.
   *
   * @param user - The user object for which the account deletion is being confirmed.
   * @param ipAddress - The IP address of the user confirming the account deletion (can be undefined).
   *
   * @throws AppError - If an error occurs during the confirmation processing.
   *
   * @returns A promise that resolves once the confirmation is processed successfully.
   */
  confirmAccountDeletion(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;
}
