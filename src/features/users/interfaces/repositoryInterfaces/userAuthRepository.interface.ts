import { IUser } from "../user.interface";

/**
 * Interface representing the authentication-related repository operations for the User entity.
 */
export interface IUserAuthRepository {
  /**
   * Finds a user by their email address without specific field selection.
   * @param email - The email address of the user to find
   * @returns A promise resolving to the user document if found, or null if no user exists with the given email
   */
  findUserByEmail(email: string): Promise<IUser | null>;

  /**
   * Finds a user by their email address and selects specific fields.
   * This is useful for retrieving only necessary fields, such as including the password for authentication.
   * @param email - The email address of the user to find
   * @param fieldsToBeSelected - Array of field names to select. Use "+" prefix to include fields hidden by default (e.g., "+password")
   * @returns A promise resolving to the user document with selected fields if found, or null if no user exists
   */
  findUserByEmailAndSelectFields(
    email: string,
    fieldsToBeSelected: string[]
  ): Promise<IUser | null>;

  /**
   * Finds a user based on dynamic conditions provided as an array of attribute-value pairs.
   * The conditions can be used to create a MongoDB query, and the method will return the first user
   * that matches the given conditions. Operators like `$gt`, `$lt`, etc., can be used with the value.
   *
   * @param conditions - An array of condition objects where each object contains:
   *   - `attribute`: The field of the user document to match (e.g., `email`, `emailVerificationToken`).
   *   - `value`: The value to match for the specified attribute (can be a string, Date, or other types).
   *   - `operator` (optional): The operator to use for the comparison (e.g., `$gt`, `$lt`, `$eq`).
   *     If not provided, a direct match will be used.
   *
   * @returns A `Promise` that resolves to the found user (`IUser`), or `null` if no user matches the conditions.
   *
   * @example
   * Example of finding a user by their email verification token and expiration date
   * const user: IUser | null = await this.findUserWithCondition([
   *   { attribute: 'emailVerificationToken', value: req.params.token },
   *   { attribute: 'emailVerificationExpires', value: new Date(), operator: '$gt' }
   * ]);
   *
   * @example
   * // Example of finding a user by the password reset token
   * const user: IUser | null = await this.findUserWithCondition([
   *   { attribute: 'passwordResetToken', value: req.params.token }
   * ]);
   */

  findUserWithCondition(
    conditions: { attribute: string; value: string | Date; operator?: string }[]
  ): Promise<IUser | null>;

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
  /**
   * Registers a new user with the provided details and generates an email verification token.
   * @param email The email address of the new user
   * @param firstName The first name of the new user
   * @param lastName The last name of the new user
   * @param password The password for the new user
   * @returns A promise resolving to the newly created user
   */
  registerUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<IUser>;

  /**
   * Logs in a user by updating their last login metadata.
   * @param user The user logging in
   * @param ipAddress The IP address from which the user is logging in (optional)
   */
  loginUser(user: IUser, ipAddress: string | undefined): Promise<void>;
}
