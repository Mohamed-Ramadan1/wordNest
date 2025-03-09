// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IUserAuthRepository, IUser } from "../interfaces/index";

@injectable()
export class UserAuthRepository implements IUserAuthRepository {
  constructor(
    @inject(TYPES.USER_MODEL) private userModel: Model<IUser> // Correct type
  ) {}

  public async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (err: any) {
      throw new Error(`Failed to find user by email: ${err.message}`);
    }
  }

  public async findUserByEmailAndSelectFields(
    email: string,
    fieldsToBeSelected: string[]
  ): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email }).select(fieldsToBeSelected);
    } catch (err: any) {
      throw new Error(`Failed to find user by email: ${err.message}`);
    }
  }

  async findUserWithCondition(
    conditions: { attribute: string; value: string | Date; operator?: string }[]
  ): Promise<IUser | null> {
    const query: { [key: string]: any } = {};

    // Loop through conditions and build the query
    conditions.forEach((condition) => {
      const { attribute, value, operator } = condition;

      if (operator) {
        query[attribute] = { [operator]: value };
      } else {
        query[attribute] = value;
      }
    });

    // Execute the query and return the result
    try {
      return await this.userModel.findOne(query);
    } catch (error) {
      console.error("Error finding user with conditions:", error);
      throw new Error("Failed to find user with the given conditions");
    }
  }

  public async markEmailAsVerified(user: IUser): Promise<void> {
    try {
      user.set({
        emailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: undefined,
        emailVerificationExpires: undefined,
      });
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to verify user email: ${err.message}`);
    }
  }

  public async resendVerification(user: IUser): Promise<void> {
    try {
      user.createEmailVerificationToken();
      user.lastVerificationEmailSentAt = new Date();
      user.resendVerificationTokenCount++;
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to resend verification email: ${err.message}`);
    }
  }

  public async requestPasswordReset(user: IUser): Promise<void> {
    try {
      // Generate password reset token
      user.createPasswordResetToken();
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to request password reset: ${err.message}`);
    }
  }

  public async resetPassword(user: IUser, newPassword: string): Promise<void> {
    try {
      user.set({
        password: newPassword,
        passwordChangedAt: new Date(),
        passwordResetToken: undefined,
        passwordResetTokenExpiredAt: undefined,
        passwordResetRequestsAttempts: 0,
        passwordLastResetRequestAttemptDate: undefined,
      });
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to reset password: ${err.message}`);
    }
  }

  public async registerUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<IUser> {
    try {
      console.log("here it begins ");

      const user: IUser = new this.userModel({
        email,
        firstName,
        lastName,
        password,
      });
      console.log("here it begins ");

      // generate verification token
      user.emailVerificationToken = user.createEmailVerificationToken();

      // save the user to the database.
      await user.save();

      return user.toObject();
    } catch (err: any) {
      console.error("Error registering user:", err);
      throw new Error(`User registration failed:${err.message}`);
    }
  }

  public async loginUser(
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      user.lastLoginIP = ipAddress;
      user.lastLoginAt = new Date();
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to login user: ${err.message}`);
    }
  }
}
