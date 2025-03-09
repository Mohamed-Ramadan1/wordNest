import { IUserAuthRepository, IUser } from "../interfaces/index";
import UserModel from "../models/user.model";
export class UserAuthRepository implements IUserAuthRepository {
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

      return user;
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
