import { Logger } from "winston";
import { createLogger } from "@logging/utils/loggerFactory";
import { ObjectId } from "mongoose";
import { IAccountDeletionLogger } from "../interfaces/accountDeletionLogger.interface";

export class AccountDeletionLogger implements IAccountDeletionLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("accountDeletion");
  }

  // log a successful  account deletion requested
  logSuccessfulAccountDeletionRequest(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    requestedAt: Date
  ) {
    this.logger.info("Account deletion request processed successfully", {
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
  logFailedAccountDeletionRequest(
    userEmail: string,
    ipAddress: string,
    userId: ObjectId,
    error: Error
  ) {
    this.logger.error("Account deletion request failed", {
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
  logSuccessfulAccountDeletionConfirmation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    confirmedAt: Date,
    requestedAt: Date,
    actualDeletionDate: Date
  ) {
    this.logger.info("Account deleted successfully", {
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
  public logFailedAccountDeletionConfirmation(
    userEmail: string,
    ipAddress: string,
    userId: ObjectId,
    userJoinedAt: Date,
    confirmedAt: Date,
    errorMessage: string
  ) {
    this.logger.error("Failed to delete account", {
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
}
