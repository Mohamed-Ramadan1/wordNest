import { IUser } from "@features/users";
import { AppError } from "@shared/index";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "@features/users";
import { IAccessControlMiddlewareHelpers } from "../interfaces/index";
/**
 * Helper class for access control middleware by validating user authentication and authorization.
 * Provides methods for token validation, user existence checks, and account status verification.
 * @implements {IAccessControlMiddlewareHelper}
 */
export class AccessControlMiddlewareHelpers
  implements IAccessControlMiddlewareHelpers
{
  /**
   * Validates the status of a user account and throws an error if the account is invalid.
   * @param user - The user object to validate.
   * @throws {AppError} - If the account is marked for deletion, deactivated, or locked.
   */
  public validateUserAccountStatus(user: IUser): void {
    // check if user account is to be deleted
    if (user.userAccountToBeDeleted) {
      throw new AppError(
        "This account is in the grace period for deletion. Please contact support to restore your account.",
        401
      );
    }

    if (user.isActive === false) {
      throw new AppError(
        "Your account has been deactivated. Please contact support for more information.",
        401
      );
    }

    if (user.isAccountLocked) {
      throw new AppError(
        "User account is locked you cant preform any actions please contact support or apply for appel.",
        400
      );
    }
  }

  /**
   * Extracts and validates the JWT token from the request headers.
   * @param req - The Express request object containing the headers.
   * @returns {string} - The extracted token.
   * @throws {AppError} - If no token is provided or the format is invalid.
   */
  public validateHeaderTokenExists(req: Request): string {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AppError("You are not logged in! Please log in", 401);
    }

    return token;
  }

  /**
   * Verifies the validity of a JWT token, including expiration.
   * @param token - The JWT token to verify.
   * @returns {JwtPayload} - The decoded JWT payload.
   * @throws {AppError} - If the token is invalid, malformed, or expired.
   */
  public verifyJWTValidity(token: string): JwtPayload {
    let decoded: JwtPayload | string;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      throw new AppError("Invalid token. Please log in again", 401);
    }

    // Ensure decoded is a JwtPayload and has exp
    if (typeof decoded === "string" || !decoded.exp) {
      throw new AppError("Invalid token. Please log in again", 401);
    }

    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      throw new AppError("Token expired. Please log in again", 401);
    }
    return decoded;
  }

  /**
   * Checks if a user exists in the database based on their ID.
   * @param userId - The ID of the user to check.
   * @returns {Promise<IUser>} - The user object if found.
   * @throws {AppError} - If the user does not exist.
   */
  public async checkUserExists(userId: IUser): Promise<IUser> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError(
        "The user belonging to this token no longer exists",
        401
      );
    }
    return user;
  }
}
