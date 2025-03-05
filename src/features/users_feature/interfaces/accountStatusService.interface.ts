import { IUser } from "@features/users_feature/interfaces/user.interface";

/**
 * Interface for the AccountStatusService class.
 * This interface defines methods for handling account deactivation and activation.
 */
export interface IAccountStatusService {
  /**
   * Requests the deactivation of the account by generating a deactivation token.
   *
   * @param user - The user who is requesting account deactivation.
   * @param ipAddress - The IP address of the user making the request (optional).
   * @returns A promise that resolves once the deactivation request is made.
   * @throws AppError - If the operation fails while requesting account deactivation.
   */
  deactivateAccountReq(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Confirms the deactivation of the account by updating the user's account status.
   *
   * @param user - The user whose account is being deactivated.
   * @param ipAddress - The IP address of the user confirming the deactivation (optional).
   * @returns A promise that resolves once the deactivation is confirmed.
   * @throws AppError - If the operation fails while confirming account deactivation.
   */
  deactivateAccountConfirmation(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void>;

  /**
   * Activates the user's account by updating the user's account status.
   *
   * @param user - The user whose account is being activated.
   * @param ipAddress - The IP address of the user activating the account (optional).
   * @returns A promise that resolves once the account is successfully activated.
   * @throws AppError - If the operation fails while activating the account.
   */
  activateAccount(user: IUser, ipAddress: string | undefined): Promise<void>;
}
