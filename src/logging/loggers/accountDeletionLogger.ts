import { Logger } from "winston";
import { createLogger } from "@logging/utils/loggerFactory";
import { ObjectId } from "mongoose";

// Configure Winston logger
const accountDeletionLogger: Logger = createLogger("accountDeletion");

// log a successf ul account deletion requested
export function logSuccessfulAccountDeletionRequest(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  requestedAt: Date
) {
  accountDeletionLogger.info(
    "Account deletion request processed successfully",
    {
      event: "account_deletion_request",
      status: "success",
      userEmail,
      userId,
      userJoinedAt,
      requestedAt,
      ipAddress,
      service: "AccountService",
      timestamp: new Date().toISOString(),
    }
  );
}

// log a failed account deletion request
export function logFailedAccountDeletionRequest(
  userEmail: string,
  ipAddress: string,
  userId: ObjectId,
  error: Error
) {
  accountDeletionLogger.error("Account deletion request failed", {
    event: "account_deletion_request",
    status: "failed",
    userEmail,
    ipAddress,
    userId,
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
  accountDeletionLogger.info("Account deleted successfully", {
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
  accountDeletionLogger.error("Failed to delete account", {
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
