import winston from "winston";
import { jsonFormatter } from "../formatters/jsonFormatter";
import { ObjectId } from "mongoose";

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/accountDeletion-logs.log" }),
  ],
});
// log a successful account deletion requested
export function logSuccessfulAccountDeletionRequest(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  requestedAt: Date
) {
  logger.info("Account deletion request processed successfully", {
    event: "account_deletion_request",
    status: "success",
    userEmail,
    userId,
    userJoinedAt,
    requestedAt,
    ipAddress,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}

// log a failed account deletion request
export function logFailedAccountDeletionRequest(
  userEmail: string,
  ipAddress: string,
  userId: ObjectId,
  error: Error
) {
  logger.error("Account deletion request failed", {
    event: "account_deletion_request",
    status: "failed",
    userEmail,
    ipAddress,
    service: "AccountService",
    error: error.message,
    timestamp: new Date().toISOString(),
  });
}

// log a successful account deletion confirmation
export function logSuccessfulAccountDeletionConfirmation(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  confirmedAt: Date,
  requestedAt: Date,
  actualDeletionDate: Date
) {
  logger.info("Account deleted successfully", {
    event: "account_deletion",
    status: "success",
    userEmail,
    userId,
    userJoinedAt,
    confirmedAt,
    ipAddress,
    requestedAt,
    actualDeletionDate,
    service: "AccountService",

    timestamp: new Date().toISOString(),
  });
}

// log a failed account deletion confirmation
export function logFailedAccountDeletionConfirmation(
  userEmail: string,
  ipAddress: string,
  userId: ObjectId,
  userJoinedAt: Date,
  confirmedAt: Date,
  errorMessage: string
) {
  logger.error("Failed to delete account", {
    event: "account_deletion",
    status: "failed",
    userEmail,
    userId,
    userJoinedAt,
    confirmedAt,
    ipAddress,
    error: errorMessage,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}
