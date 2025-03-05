// Models imports
import { IUser } from "@features/users_feature";

// utils imports
import { handleServiceError } from "@utils/index";

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

// interface imports
import { IAccountRecoveryService } from "../interfaces";
// Account recovery class
export default class AccountRecoveryService implements IAccountRecoveryService {
  // Verify user's email address.
  public verifyEmail = async (user: IUser): Promise<void> => {
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
      handleServiceError(err);
    }
  };

  // Resend verification email.
  public resendVerification = async (user: IUser) => {
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
      handleServiceError(err);
    }
  };

  // Forgot password.
  public requestPasswordReset = async (user: IUser, ip: string | undefined) => {
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
      handleServiceError(err);
    }
  };

  // Reset password.
  public resetPassword = async (
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
      handleServiceError(err);
    }
  };
}
