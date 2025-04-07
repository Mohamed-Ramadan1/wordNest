import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "@features/users";

/**
 * Interface for the AccessControlMiddlewareHelper class.
 * Defines helper methods for validating user authentication and authorization.
 */
export interface IAccessControlMiddlewareHelpers {
  /**
   * Validates the status of a user account and throws an error if the account is invalid.
   * @param user - The user object to validate.
   * @throws {AppError} - If the account is marked for deletion, deactivated, or locked.
   */
  validateUserAccountStatus(user: IUser): void;

  /**
   * Extracts and validates the JWT token from the request headers.
   * @param req - The Express request object containing the headers.
   * @returns {string} - The extracted token.
   * @throws {AppError} - If no token is provided or the format is invalid.
   */
  validateHeaderTokenExists(req: Request): string;

  /**
   * Verifies the validity of a JWT token, including expiration.
   * @param token - The JWT token to verify.
   * @returns {JwtPayload} - The decoded JWT payload.
   * @throws {AppError} - If the token is invalid, malformed, or expired.
   */
  verifyJWTValidity(token: string): JwtPayload;

  /**
   * Checks if a user exists in the database based on their ID.
   * @param userId - The ID of the user to check.
   * @returns {Promise<IUser>} - The user object if found.
   * @throws {AppError} - If the user does not exist.
   */
  checkUserExists(userId: IUser): Promise<IUser>;
}
