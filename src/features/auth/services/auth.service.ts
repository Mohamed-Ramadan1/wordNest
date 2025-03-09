// Express imports
import { Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// utils imports
import {
  generateAuthToken,
  generateLogOutToken,
  handleServiceError,
  TYPES,
} from "@shared/index";

// jobs imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// interfaces
import { IAuthLogger } from "@logging/interfaces";

// interfaces imports
import { IAuthService } from "../interfaces";

// users imports
import { IUserAuthRepository } from "@features/users/interfaces";

/**
 * Service class responsible for handling authentication operations such as registration, login, and logout.
 * @implements {IAuthService}
 */
@injectable()
export default class AuthService implements IAuthService {
  // private authLogger: IAuthLogger;

  /**
   * Constructs an instance of AuthService with injected dependencies.
   * @param authLogger - The logger instance for authentication-related events.
   * @param userAuthRepository - The repository instance for user authentication operations.
   */
  constructor(
    @inject(TYPES.AuthLogger) private readonly authLogger: IAuthLogger,
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository
  ) {}

  /**
   * Registers a new user with the provided email, first name, last name, and password.
   * @param email - The email address of the user.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param password - The password for the user account.
   * @param res - The Express response object used to set authentication details.
   * @returns A promise that resolves to an object containing the registered user and an authentication token.
   */
  public async registerWithEmail(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    res: Response
  ): Promise<{ user: IUser; token: string }> {
    // create a new user with the provided details.
    try {
      const user: IUser = await this.userAuthRepository.registerUser(
        email,
        firstName,
        lastName,
        password
      );

      const token: string = generateAuthToken(user, res);

      // add welcome email to the emails-queue.
      emailQueue.add(EmailQueueJobs.WelcomeEmail, { user });

      return { user, token };
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Logs in an existing user and generates an authentication token.
   * @param user - The user object to log in.
   * @param ipAddress - The IP address from which the login request originated (optional).
   * @param res - The Express response object used to set authentication details.
   * @returns A promise that resolves to an object containing the authentication token.
   */
  public async loginWithEmail(
    user: IUser,
    ipAddress: string | undefined,
    res: Response
  ): Promise<{ token: string }> {
    try {
      const token: string = generateAuthToken(user, res);
      this.userAuthRepository.loginUser(user, ipAddress);
      this.authLogger.logSuccessfulLogin(user.email, ipAddress);
      return { token };
    } catch (err: any) {
      this.authLogger.logFailedLogin(user.email, ipAddress, err.message);
      handleServiceError(err);
    }
  }

  /**
   * Logs out a user and clears the authentication cookie.
   * @param user - The user object to log out.
   * @param ipAddress - The IP address from which the logout request originated (optional).
   * @param res - The Express response object used to clear authentication details.
   * @returns The logout token as a string.
   */
  public logout(
    user: IUser,
    ipAddress: string | undefined,
    res: Response
  ): string {
    try {
      const token: string = generateLogOutToken(user, res);
      res.clearCookie("jwt");
      this.authLogger.logSuccessfulLogout(user.email as string, ipAddress);
      return token;
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
