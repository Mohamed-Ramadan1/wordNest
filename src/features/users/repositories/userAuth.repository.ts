import { IUserAuthRepository, IUser } from "../interfaces/index";

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
}
