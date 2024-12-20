// modules / packages imports.
import { isEmail } from "class-validator";
import { Response } from "express";
import { omit } from "lodash";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, generateAuthToken, generateLogOutToken } from "@utils/index";

//jobs imports
import { emailQueue } from "@jobs/index";
import { promises } from "dns";

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
    emailQueue.add("welcomeEmail", { user });

    return { user, token };
  }

  static async loginWithEmail(
    user: IUser,
    res: Response
  ): Promise<{ token: string }> {
    const token: string = await generateAuthToken(user, res);

    return { token };
  }

  static logout(user: IUser, res: Response): string {
    const token: string = generateLogOutToken(user, res);
    res.clearCookie("jwt");

    return token;
  }
}
