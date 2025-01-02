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
