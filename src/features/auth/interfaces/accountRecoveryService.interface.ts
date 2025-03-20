import { IUser } from "@features/users";

/**
 * Interface defining the contract for account recovery services.
 */
export interface IAccountRecoveryService {
  /**
   * Verifies the user's email address.
   * This method marks the user's email as verified and removes any
   * pending email verification tokens.
   *
   * @param user - The user whose email is being verified.
   * @returns A promise that resolves when the operation is complete.
   */
  verifyEmail(user: IUser): Promise<void>;

  /**
   * Resend the email verification link to the user.
   * Generates a new verification token and sends a verification email.
   *
   * @param user - The user requesting email verification resend.
   * @returns A promise that resolves when the email is sent.
   */
  resendVerification(user: IUser): Promise<void>;

  /**
   * Initiates a password reset request for the user.
   * Generates a password reset token and sends an email to the user.
   *
   * @param user - The user requesting the password reset.
   * @param ip - The IP address from which the request was made.
   * @returns A promise that resolves when the reset request is processed.
   */
  requestPasswordReset(user: IUser, ip: string | undefined): Promise<void>;

  /**
   * Resets the user's password.
   * Updates the user's password and clears any active password reset tokens.
   *
   * @param user - The user whose password is being reset.
   * @param newPassword - The new password to set for the user.
   * @param ip - The IP address from which the request was made.
   * @returns A promise that resolves when the password reset is successful.
   */
  resetPassword(
    user: IUser,
    newPassword: string,
    ip: string | undefined
  ): Promise<void>;
}
