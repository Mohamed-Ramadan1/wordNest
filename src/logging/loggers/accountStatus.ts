import { Logger } from "winston";
import { createLogger } from "@logging/utils/loggerFactory";
import { ObjectId } from "mongoose";

// Configure Winston logger
const accountStatusLogger: Logger = createLogger("accountStatus");

// Log a successful account deactivation request
export function logSuccessfulAccountDeactivationRequest(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  requestedAt: Date
) {
  accountStatusLogger.info(
    "Account deactivation request processed successfully",
    {
      event: "account_deactivation_request",
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

// Log a successful account deactivation confirmation
export function logSuccessfulAccountDeactivationConfirmation(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  confirmedAt: Date
) {
  accountStatusLogger.info("Account deactivated successfully", {
    event: "account_deactivation",
    status: "success",
    userEmail,
    userId,
    userJoinedAt,
    confirmedAt,
    ipAddress,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}

// Log a failed account deactivation request
export function logFailedAccountDeactivationRequest(
  userEmail: string,
  ipAddress: string,
  userId: ObjectId,
  userJoinedAt: Date,
  errorMessage: string
) {
  accountStatusLogger.error("Failed to process account deactivation request", {
    event: "account_deactivation_request",
    status: "failed",
    userEmail,
    userId,
    userJoinedAt,
    error: errorMessage,
    ipAddress,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}

// Log a failed account deactivation confirmation
export function logFailedAccountDeactivationConfirmation(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  errorMessage: string
) {
  accountStatusLogger.error("Failed to confirm account deactivation", {
    event: "account_deactivation",
    status: "failed",
    userEmail,
    userId,
    userJoinedAt,
    error: errorMessage,
    ipAddress,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}

// Log success account activation
export function logSuccessfulAccountActivation(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  activatedAt: Date
) {
  accountStatusLogger.info("Account activated successfully", {
    event: "account_activation",
    status: "success",
    ipAddress,
    userEmail,
    userId,
    userJoinedAt,
    activatedAt,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}

// Log failed account activation
export function logFailedAccountActivation(
  ipAddress: string,
  userEmail: string,
  userId: ObjectId,
  userJoinedAt: Date,
  errorMessage: string
) {
  accountStatusLogger.error("Failed to activate account", {
    event: "account_activation",
    status: "failed",
    ipAddress,
    userEmail,
    userId,
    userJoinedAt,
    error: errorMessage,
    service: "AccountService",
    timestamp: new Date().toISOString(),
  });
}
