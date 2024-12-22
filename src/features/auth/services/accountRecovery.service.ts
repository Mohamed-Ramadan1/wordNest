// modules / packages imports.

import { startSession, ClientSession } from "mongoose";

// Models imports
import { IUser } from "@features/users";

// utils imports
import { AppError } from "@utils/index";

//jobs imports
import { emailQueue } from "@jobs/index";

// config imports t
import { EmailQueueType } from "@config/emailQueue.config";

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
    const session: ClientSession = await startSession();
    try {
      session.startTransaction();

      user.set({
        emailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: undefined,
        emailVerificationExpires: undefined,
      });

      await user.save({ session });
      await session.commitTransaction();
      emailQueue.add(EmailQueueType.SendAccountVerifiedEmail, { user });
      // log the successful email verification attempt.
      logSuccessfulEmailVerification(
        user.email,
        user._id,
        user.createdAt,
        user.emailVerifiedAt
      );
    } catch (err: any) {
      await session.abortTransaction();
      // log the failed email verification attempt.
      logFailedEmailVerification(
        user.email,
        user._id,
        user.createdAt,
        err.message
      );
      throw new AppError(err.message, 500);
    } finally {
      session.endSession();
    }
  };
  // Resend verification email.
  static resendVerification = async (user: IUser) => {
    try {
      user.createEmailVerificationToken();
      user.lastVerificationEmailSentAt = new Date();
      user.resendVerificationTokenCount++;
      await user.save();
      emailQueue.add(EmailQueueType.ResendVerificationEmail, { user });
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
    const session: ClientSession = await startSession();

    try {
      session.startTransaction();

      // Generate password reset token
      user.createPasswordResetToken();

      // Save the user document with the session
      await user.save({ session });

      // Log successful password reset request
      logSuccessfulPasswordReset(user.email, user.id, ip);

      // Commit the transaction
      await session.commitTransaction();

      emailQueue.add(EmailQueueType.RequestPasswordReset, { user });
    } catch (err: any) {
      // Log the failed password reset attempt
      logFailedPasswordReset(
        user.email,
        ip,
        user.id,
        err.message || "Unknown error"
      );

      // Abort the transaction if it was started
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      // Throw a meaningful error
      throw new AppError(
        "Password reset request failed. Please try again later.",
        500
      );
    } finally {
      // End the session
      session.endSession();
    }
  };
  // Reset password.
  static resetPassword = async (
    user: IUser,
    newPassword: string,
    ip: string | undefined
  ) => {
    const session: ClientSession = await startSession();

    try {
      session.startTransaction();

      user.set({
        password: newPassword,
        passwordChangedAt: new Date(),
        passwordResetToken: undefined,
        passwordResetTokenExpiredAt: undefined,
        passwordResetRequestsAttempts: 0,
        passwordLastResetRequestAttemptDate: undefined,
      });

      await user.save({ session });
      await session.commitTransaction();
      emailQueue.add(EmailQueueType.ResetPassword, { user });
      logSuccessfulPasswordReset(user.email, user.id, ip);
    } catch (err: any) {
      await session.abortTransaction();
      logFailedPasswordReset(user.email, ip, user.id, err.message);
      // If transaction failed, re-throw the error
      throw new AppError("Password reset failed. Please try again later.", 500);
    } finally {
      session.endSession();
    }
  };
}
