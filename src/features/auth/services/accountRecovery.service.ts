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
} from "@logging/index";
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
  static requestPasswordReset = async (email: string) => {};
  // Reset password.
  static resetPassword = async (token: string, newPassword: string) => {};
}
