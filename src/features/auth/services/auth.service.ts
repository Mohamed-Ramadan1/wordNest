// modules / packages imports.
import { Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import {
  generateAuthToken,
  generateLogOutToken,
  handleServiceError,
} from "@shared/index";

//jobs imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// logging imports
import {
  logSuccessfulLogin,
  logSuccessfulLogout,
  logFailedLogin,
} from "@logging/index";

// interfaces imports
import { IAuthService } from "../interfaces";

export default class AuthService implements IAuthService {
  public async registerWithEmail(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    res: Response
  ): Promise<{ user: IUser; token: string }> {
    // create a new user with the provided details.
    try {
      const user: IUser = new UserModel({
        email,
        firstName,
        lastName,
        password,
      });
      // generate verification token
      user.emailVerificationToken = user.createEmailVerificationToken();

      // save the user to the database.
      await user.save();

      const token: string = generateAuthToken(user, res);

      // add welcome email to the emails-queue.
      emailQueue.add(EmailQueueJobs.WelcomeEmail, { user });

      return { user, token };
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  public async loginWithEmail(
    user: IUser,
    ipAddress: string | undefined,
    res: Response
  ): Promise<{ token: string }> {
    try {
      const token: string = generateAuthToken(user, res);
      user.lastLoginIP = ipAddress;
      user.lastLoginAt = new Date();
      await user.save();
      logSuccessfulLogin(user.email, ipAddress);
      return { token };
    } catch (err: any) {
      logFailedLogin(user.email, ipAddress, err.message);
      handleServiceError(err);
    }
  }

  public logout(
    user: IUser,
    ipAddress: string | undefined,
    res: Response
  ): string {
    try {
      const token: string = generateLogOutToken(user, res);
      res.clearCookie("jwt");
      logSuccessfulLogout(user.email as string, ipAddress);
      return token;
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
