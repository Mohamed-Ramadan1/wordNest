import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IEmailsVerificationsLogger } from "@logging/interfaces";

export class EmailVerificationLogger implements IEmailsVerificationsLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("emailVerification");
  }

  // Log fail attempts to send emails to the users
  public logFailedEmailVerification(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date,
    errMessage: string
  ) {
    this.logger.error("Failed to verify user  email", {
      event: "email_verification_failed",
      user: userEmail,
      user_id: user_id,
      userJoinedAt: userJoinedAt,
      error: errMessage,
      timestamp: new Date().toISOString(),
    });
  }

  // Log successful email verification
  public logSuccessfulEmailVerification(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date,
    emailVerifiedAt: Date
  ) {
    this.logger.info("User email verified", {
      event: "email_verification_success",
      user: userEmail,
      user_id: user_id,
      userJoinedAt: userJoinedAt,
      emailVerifiedAt: emailVerifiedAt,
      timestamp: new Date().toISOString(),
    });
  }

  //Log successful resend verification email
  public logSuccessfulEmailResend(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date
  ) {
    this.logger.info("User email verification resend", {
      event: "email_verification_resend_success",
      user: userEmail,
      user_id: user_id,
      userJoinedAt: userJoinedAt,
      timestamp: new Date().toISOString(),
    });
  }

  //Log failed resend verification email
  public logFailedEmailResend(
    userEmail: string,
    user_id: ObjectId,
    userJoinedAt: Date,
    errMessage: string
  ) {
    this.logger.error("Failed to resend verification email", {
      event: "email_verification_resend_failed",
      user: userEmail,
      user_id: user_id,
      userJoinedAt: userJoinedAt,
      error: errMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
