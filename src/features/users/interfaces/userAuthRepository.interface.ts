import { IUser } from "./user.interface";

/**
 * Interface representing the authentication-related repository operations for the User entity.
 */
export interface IUserAuthRepository {
  /**
   * Verifies a user's email address by updating verification status and clearing tokens.
   * @param user The user whose email is being verified
   */
  markEmailAsVerified(user: IUser): Promise<void>;

  /**
   * Resend an email verification token to the user and updates related metadata.
   * @param user The user requesting a new verification email
   */
  resendVerification(user: IUser): Promise<void>;

  /**
   * Requests a password reset by generating a reset token for the user.
   * @param user The user requesting a password reset
   */
  requestPasswordReset(user: IUser): Promise<void>;

  /**
   * Resets the user's password and clears reset-related tokens and metadata.
   * @param user The user whose password is being reset
   * @param newPassword The new password to set
   */
  resetPassword(user: IUser, newPassword: string): Promise<void>;
}
