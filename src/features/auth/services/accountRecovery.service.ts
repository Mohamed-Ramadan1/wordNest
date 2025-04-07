// packages imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// Shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// jobs imports
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// interface imports
import { IAccountRecoveryService } from "../interfaces";

// interfaces imports
import { IAuthLogger, IEmailsVerificationsLogger } from "@logging/interfaces";

// users imports
import { IUserAuthRepository } from "@features/users/interfaces";

/**
 * Service class responsible for handling account recovery operations such as email verification and password reset.
 * @implements {IAccountRecoveryService}
 */
@injectable()
export default class AccountRecoveryService implements IAccountRecoveryService {
  /**
   * Constructs an instance of AccountRecoveryService with injected dependencies.
   * @param userAuthRepository - The repository instance for user authentication operations.
   * @param authLogger - The logger instance for authentication-related events.
   * @param emailsVerificationsLogger - The logger instance for email verification events.
   */
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository,
    @inject(TYPES.AuthLogger) private readonly authLogger: IAuthLogger,
    @inject(TYPES.EmailVerificationLogger)
    private readonly emailsVerificationsLogger: IEmailsVerificationsLogger,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  /**
   * Verifies a user's email address and logs the result.
   * @param user - The user whose email is to be verified.
   * @returns A promise that resolves when the email is verified.
   */
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
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Resends a verification email to the user and logs the result.
   * @param user - The user requesting a new verification email.
   */
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
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Requests a password reset for the user and logs the result.
   * @param user - The user requesting a password reset.
   * @param ip - The IP address from which the request originated (optional).
   */
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
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Resets the user's password and logs the result.
   * @param user - The user whose password is to be reset.
   * @param newPassword - The new password to set for the user.
   * @param ip - The IP address from which the reset request originated (optional).
   */
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
      this.errorUtils.handleServiceError(err);
    }
  };
}
