import { Response } from "express";
import { ObjectId } from "mongoose";

/**
 * Interface defining the contract for token management operations
 * @interface ITokenManagement
 */
export interface ITokenManagement {
  /**
   * Generates a JSON Web Token for user authentication and sets it in a response cookie
   * @param {ObjectId} userId - The MongoDB ObjectId of the user to generate the token for
   * @param {Response} res - The Express Response object used to set the authentication cookie
   * @returns {string} The generated JWT access token
   * @example
   * const token = tokenManager.generateAccessToken(user._id, res);
   */
  generateAccessToken(userId: ObjectId, res: Response): string;

  /**
   * Generates a short-lived token for logout purposes and clears the authentication cookie
   * @param {ObjectId} userId - The MongoDB ObjectId of the user to generate the logout token for
   * @param {Response} res - The Express Response object used to clear the authentication cookie
   * @returns {string} The generated short-lived logout token
   * @example
   * const logoutToken = tokenManager.generateLogoutToken(user._id, res);
   */
  generateLogoutToken(userId: ObjectId, res: Response): string;
}
