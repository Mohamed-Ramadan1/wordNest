import { Response } from "express";
import { IUser } from "@features/users_feature";

/**
 * Interface for the AuthService that defines the available authentication-related operations.
 * These methods handle user registration, login, and logout functionalities.
 */
export interface IAuthService {
  /**
   * Registers a new user with the provided email, first name, last name, and password.
   * Also sends a welcome email and generates an authentication token.
   *
   * @param email - The email address of the user.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param password - The password chosen by the user.
   * @param res - The Express response object for setting the authentication token.
   *
   * @returns A promise that resolves to an object containing the user and their authentication token.
   */
  registerWithEmail(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    res: Response
  ): Promise<{ user: IUser; token: string }>;

  /**
   * Logs in an existing user by generating an authentication token.
   * Updates the user's last login information and logs the successful login attempt.
   *
   * @param user - The user attempting to log in.
   * @param ipAddress - The IP address from which the login request originated.
   * @param res - The Express response object for setting the authentication token.
   *
   * @returns A promise that resolves to an object containing the authentication token.
   */
  loginWithEmail(
    user: IUser,
    ipAddress: string | undefined,
    res: Response
  ): Promise<{ token: string }>;

  /**
   * Logs out the user by generating a logout token and clearing the authentication cookie.
   * Logs the successful logout attempt.
   *
   * @param user - The user logging out.
   * @param ipAddress - The IP address from which the logout request originated.
   * @param res - The Express response object for clearing the authentication cookie.
   *
   * @returns The generated logout token.
   */
  logout(user: IUser, ipAddress: string | undefined, res: Response): string;
}
