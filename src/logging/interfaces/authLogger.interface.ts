import { ObjectId } from "mongoose";

/**
 * Interface for authentication logging functionality.
 * Provides methods to log authentication-related events such as login, logout, registration, and password reset.
 */
export interface IAuthLogger {
  /**
   * Logs a successful login event.
   * @param userEmail - The email of the user logging in.
   * @param ipAddress - The IP address from which the login was attempted.
   */
  logSuccessfulLogin(userEmail: string, ipAddress: string | undefined): void;

  /**
   * Logs a failed login attempt.
   * @param userEmail - The email of the user attempting to log in.
   * @param ipAddress - The IP address from which the login was attempted.
   * @param errMessage - The error message describing the reason for failure.
   */
  logFailedLogin(
    userEmail: string,
    ipAddress: string | undefined,
    errMessage: string
  ): void;

  /**
   * Logs a successful user registration.
   * @param userEmail - The email of the user registering.
   * @param ipAddress - The IP address from which the registration was attempted.
   */
  logSuccessfulRegister(userEmail: string, ipAddress: string | undefined): void;

  /**
   * Logs a failed registration attempt.
   * @param userEmail - The email of the user attempting to register.
   * @param ipAddress - The IP address from which the registration was attempted.
   */
  logFailedRegister(userEmail: string, ipAddress: string): void;

  /**
   * Logs a successful logout event.
   * @param userEmail - The email of the user logging out.
   * @param ipAddress - The IP address from which the logout was performed.
   */
  logSuccessfulLogout(userEmail: string, ipAddress: string | undefined): void;

  /**
   * Logs a successful password reset request.
   * @param userEmail - The email of the user requesting a password reset.
   * @param userId - The ObjectId of the user requesting the reset.
   * @param ipAddress - The IP address from which the request was made.
   */
  logSuccessfulPasswordReset(
    userEmail: string,
    userId: ObjectId,
    ipAddress: string | undefined
  ): void;

  /**
   * Logs a failed password reset attempt.
   * @param userEmail - The email of the user attempting the password reset.
   * @param ipAddress - The IP address from which the request was made.
   * @param userId - The ObjectId of the user attempting the reset.
   * @param errorMessage - The error message describing the reason for failure.
   */
  logFailedPasswordReset(
    userEmail: string,
    ipAddress: string | undefined,
    userId: ObjectId,
    errorMessage: string
  ): void;
}
