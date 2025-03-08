import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IChangeAccountEmailLogger } from "../interfaces/index";

export class ChangeAccountEmailLogger implements IChangeAccountEmailLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("changeAccountEmail");
  }

  // Log successfully request change account email request
  public logSuccessRequestChangeAccountEmail = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    requestedAt: Date
  ) => {
    this.logger.info({
      message: `User requested to change email`,
      userEmail,
      userId,
      ipAddress,
      requestedAt,
      event: "change_account_email_request",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // Log fail request change account email
  public logFailedRequestChangeAccountEmail = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ) => {
    this.logger.error({
      message: `Failed to request change email`,
      userEmail,
      userId,
      ipAddress,
      error: errorMessage,
      event: "change_account_email_request_failed",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // log success confirm email change
  public logSuccessConfirmEmailChange = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    confirmedAt: Date
  ) => {
    this.logger.info({
      message: `User confirmed email change`,
      userEmail,
      userId,
      ipAddress,
      confirmedAt,
      event: "confirm_email_change",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // log failed confirm email change
  public logFailedConfirmEmailChange = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ) => {
    this.logger.error({
      message: `Failed to confirm email change`,
      userEmail,
      userId,
      ipAddress,
      error: errorMessage,
      event: "confirm_email_change_failed",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // log success change user account email address
  public logSuccessChangeUserEmail = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    changedAt: Date
  ) => {
    this.logger.info({
      message: `User changed email address`,
      userEmail,
      userId,
      ipAddress,
      changedAt,
      event: "change_user_email",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // log failed change user account email address
  public logFailedChangeUserEmail = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ) => {
    this.logger.error({
      message: `Failed to change email address`,
      userEmail,
      userId,
      ipAddress,
      error: errorMessage,
      event: "change_user_email_failed",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // log success resend email verification token
  public logSuccessResendEmailVerificationToken = (
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    ipAddress: string
  ) => {
    this.logger.info({
      message: `User resent email verification token`,
      userEmail,
      userId,
      userJoinedAt,
      ipAddress,
      event: "email_verification_resend",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };

  // log failed resend email verification token
  public logFailedResendEmailVerificationToken = (
    userEmail: string,
    userId: ObjectId,
    ipAddress: string,
    errorMessage: string
  ) => {
    this.logger.error({
      message: `Failed to resend email verification token`,
      userEmail,
      userId,
      ipAddress,
      error: errorMessage,
      event: "email_verification_resend_failed",
      service: "AccountEmailService",
      timestamp: new Date().toISOString(),
    });
  };
}
