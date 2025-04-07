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

  /**
   * Finds a user by their email address
   * @param email - The email address to search for
   * @returns Promise resolving to the user object or null if not found
   * @throws Error if the database query fails
   */
  public async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (err: any) {
      throw new Error(`Failed to find user by email: ${err.message}`);
    }
  }

  /**
   * Finds a user by email and selects specific fields
   * @param email - The email address to search for
   * @param fieldsToBeSelected - Array of field names to include in the result
   * @returns Promise resolving to the user object with selected fields or null if not found
   * @throws Error if the database query fails
   */
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

  /**
   * Finds a user based on multiple conditions
   * @param conditions - Array of condition objects containing attribute, value, and optional operator
   * @returns Promise resolving to the matching user object or null if not found
   * @throws Error if the database query fails
   */
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

  /**
   * Marks a user's email as verified and updates related fields
   * @param user - The user object to update
   * @returns Promise that resolves when the update is complete
   * @throws Error if the database update fails
   */
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

  /**
   * Resends email verification for a user
   * @param user - The user object to update
   * @returns Promise that resolves when the update is complete
   * @throws Error if the database update fails
   */
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

  /**
   * Requests a password reset for a user
   * @param user - The user object to update
   * @returns Promise that resolves when the update is complete
   * @throws Error if the database update fails
   */
  public async requestPasswordReset(user: IUser): Promise<void> {
    try {
      // Generate password reset token
      user.createPasswordResetToken();
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to request password reset: ${err.message}`);
    }
  }

  /**
   * Resets a user's password and clears reset-related fields
   * @param user - The user object to update
   * @param newPassword - The new password to set
   * @returns Promise that resolves when the update is complete
   * @throws Error if the database update fails
   */
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

  /**
   * Registers a new user with the provided details
   * @param email - The user's email address
   * @param firstName - The user's first name
   * @param lastName - The user's last name
   * @param password - The user's password
   * @returns Promise resolving to the created user object
   * @throws Error if user registration fails
   */
  public async registerUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<IUser> {
    try {
      const user: IUser = new this.userModel({
        email,
        firstName,
        lastName,
        password,
      });

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

  /**
   * Updates user login information
   * @param user - The user object to update
   * @param ipAddress - The IP address from which the user is logging in (optional)
   * @returns Promise that resolves when the update is complete
   * @throws Error if the database update fails
   */
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
