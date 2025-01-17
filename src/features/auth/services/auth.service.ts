// modules / packages imports.
import { Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, generateAuthToken, generateLogOutToken } from "@utils/index";

//jobs imports
import { emailQueue } from "@jobs/index";

// config imports
import { EmailQueueType } from "@config/emailQueue.config";

// logging imports
import {
  logSuccessfulLogin,
  logSuccessfulLogout,
  logFailedLogin,
} from "@logging/index";

export default class AuthService {
  static async registerWithEmail(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    res: Response
  ): Promise<{ user: IUser; token: string }> {
    // create a new user with the provided details.
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
    emailQueue.add(EmailQueueType.WelcomeEmail, { user });

    return { user, token };
  }

  static async loginWithEmail(
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
      throw new AppError(err.message, 500);
    }
  }

  static logout(
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
      throw new AppError(err.message, 500);
    }
  }
}
 