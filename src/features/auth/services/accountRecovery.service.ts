//packages imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// Shard imports
import { TYPES, handleServiceError } from "@shared/index";

//jobs imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// interface imports
import { IAccountRecoveryService } from "../interfaces";

// interfaces imports
import { IAuthLogger, IEmailsVerificationsLogger } from "@logging/interfaces";

// users imports
import { IUserAuthRepository } from "@features/users/interfaces";

@injectable()
export default class AccountRecoveryService implements IAccountRecoveryService {
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository,
    @inject(TYPES.AuthLogger) private readonly authLogger: IAuthLogger,
    @inject(TYPES.EmailVerificationLogger)
    private readonly emailsVerificationsLogger: IEmailsVerificationsLogger
  ) {}
  // Verify user's email address.
  public verifyEmail = async (user: IUser): Promise<void> => {
    try {
      await this.userAuthRepository.markEmailAsVerified(user);
      emailQueue.add(EmailQueueJobs.SendAccountVerifiedEmail, { user });
      // log the successful email verification attempt.
      this.emailsVerificationsLogger.logSuccessfulEmailVerification(
        user.email,
        user._id,
        user.createdAt,
        user.emailVerifiedAt
      );
    } catch (err: any) {
      // log the failed email verification attempt.
      this.emailsVerificationsLogger.logFailedEmailVerification(
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
      await this.userAuthRepository.resendVerification(user);
      emailQueue.add(EmailQueueJobs.ResendVerificationEmail, { user });
      // log the successful email resend attempt.
      this.emailsVerificationsLogger.logSuccessfulEmailResend(
        user.email,
        user._id,
        user.createdAt
      );
    } catch (err: any) {
      // log the failed email resend attempt.
      this.emailsVerificationsLogger.logFailedEmailResend(
        user.email,
        user._id,
        user.createdAt,
        err.message
      );
      handleServiceError(err);
    }
  };

  // Forgot password.
  public requestPasswordReset = async (user: IUser, ip: string | undefined) => {
    try {
      await this.userAuthRepository.requestPasswordReset(user);

      // Log successful password reset request
      this.authLogger.logSuccessfulPasswordReset(user.email, user.id, ip);

      emailQueue.add(EmailQueueJobs.RequestPasswordReset, { user });
    } catch (err: any) {
      // Log the failed password reset attempt
      this.authLogger.logFailedPasswordReset(
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
      await this.userAuthRepository.resetPassword(user, newPassword);
      emailQueue.add(EmailQueueJobs.ResetPassword, { user });
      this.authLogger.logSuccessfulPasswordReset(user.email, user.id, ip);
    } catch (err: any) {
      this.authLogger.logFailedPasswordReset(
        user.email,
        ip,
        user.id,
        err.message
      );
      // If transaction failed, re-throw the error
      handleServiceError(err);
    }
  };
}
