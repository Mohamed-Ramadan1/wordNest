// Models imports
import { IUser } from "@features/users";

// utils imports
import { AppError } from "@utils/index";

//jobs imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

//logging imports
import {
  logFailedEmailVerification,
  logSuccessfulEmailVerification,
  logSuccessfulEmailResend,
  logFailedEmailResend,
  logFailedPasswordReset,
  logSuccessfulPasswordReset,
} from "@logging/index";

// Account recovery class
export default class AccountRecoveryService {
  // Verify user's email address.
  static verifyEmail = async (user: IUser): Promise<void> => {
    try {
      user.set({
        emailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: undefined,
        emailVerificationExpires: undefined,
      });

      await user.save();

      emailQueue.add(EmailQueueJobs.SendAccountVerifiedEmail, { user });
      // log the successful email verification attempt.
      logSuccessfulEmailVerification(
        user.email,
        user._id,
        user.createdAt,
        user.emailVerifiedAt
      );
    } catch (err: any) {
      // log the failed email verification attempt.
      logFailedEmailVerification(
        user.email,
        user._id,
        user.createdAt,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  };

  // Resend verification email.
  static resendVerification = async (user: IUser) => {
    try {
      user.createEmailVerificationToken();
      user.lastVerificationEmailSentAt = new Date();
      user.resendVerificationTokenCount++;
      await user.save();
      emailQueue.add(EmailQueueJobs.ResendVerificationEmail, { user });
      // log the successful email resend attempt.
      logSuccessfulEmailResend(user.email, user._id, user.createdAt);
    } catch (err: any) {
      // log the failed email resend attempt.
      logFailedEmailResend(user.email, user._id, user.createdAt, err.message);
      throw new AppError(err.message, 500);
    }
  };

  // Forgot password.
  static requestPasswordReset = async (user: IUser, ip: string | undefined) => {
    try {
      // Generate password reset token
      user.createPasswordResetToken();

      // Save the user document with the session
      await user.save();

      // Log successful password reset request
      logSuccessfulPasswordReset(user.email, user.id, ip);

      emailQueue.add(EmailQueueJobs.RequestPasswordReset, { user });
    } catch (err: any) {
      // Log the failed password reset attempt
      logFailedPasswordReset(
        user.email,
        ip,
        user.id,
        err.message || "Unknown error"
      );

      // Throw a meaningful error
      throw new AppError(
        "Password reset request failed. Please try again later.",
        500
      );
    }
  };

  // Reset password.
  static resetPassword = async (
    user: IUser,
    newPassword: string,
    ip: string | undefined
  ) => {
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

      emailQueue.add(EmailQueueJobs.ResetPassword, { user });
      logSuccessfulPasswordReset(user.email, user.id, ip);
    } catch (err: any) {
      logFailedPasswordReset(user.email, ip, user.id, err.message);
      // If transaction failed, re-throw the error
      throw new AppError("Password reset failed. Please try again later.", 500);
    }
  };
}
