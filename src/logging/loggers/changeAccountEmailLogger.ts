import winston from "winston";
import { jsonFormatter } from "@logging/formatters/jsonFormatter";
import { ObjectId } from "mongoose";

const logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/changeAccountEmail-logs.log",
    }),
  ],
});

// Log successfully request change account email request
export const logSuccessRequestChangeAccountEmail = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  requestedAt: Date
) => {
  logger.info({
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
export const logFailedRequestChangeAccountEmail = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  errorMessage: string
) => {
  logger.error({
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
export const logSuccessConfirmEmailChange = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  confirmedAt: Date
) => {
  logger.info({
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
export const logFailedConfirmEmailChange = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  errorMessage: string
) => {
  logger.error({
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
export const logSuccessChangeUserEmail = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  changedAt: Date
) => {
  logger.info({
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
export const logFailedChangeUserEmail = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  errorMessage: string
) => {
  logger.error({
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
export const logSuccessResendEmailVerificationToken = (
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  ipAddress: string
) => {
  logger.info({
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
export const logFailedResendEmailVerificationToken = (
  userEmail: string,
  userId: ObjectId,
  ipAddress: string,
  errorMessage: string
) => {
  logger.error({
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
