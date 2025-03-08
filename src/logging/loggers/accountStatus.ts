import { Logger } from "winston";
import { createLogger } from "@logging/utils/loggerFactory";
import { ObjectId } from "mongoose";
import { IAccountStatusLogger } from "../interfaces/accountStatusLogger.interface";

export class AccountStatusLogger implements IAccountStatusLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("accountStatus");
  }

  // Log a successful account deactivation request
  public logSuccessfulAccountDeactivationRequest(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    requestedAt: Date
  ) {
    this.logger.info("Account deactivation request processed successfully", {
      event: "account_deactivation_request",
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

  // Log a successful account deactivation confirmation
  public logSuccessfulAccountDeactivationConfirmation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    confirmedAt: Date
  ) {
    this.logger.info("Account deactivated successfully", {
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
  public logFailedAccountDeactivationRequest(
    userEmail: string,
    ipAddress: string,
    userId: ObjectId,
    userJoinedAt: Date,
    errorMessage: string
  ) {
    this.logger.error("Failed to process account deactivation request", {
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
  public logFailedAccountDeactivationConfirmation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    errorMessage: string
  ) {
    this.logger.error("Failed to confirm account deactivation", {
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
  public logSuccessfulAccountActivation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    activatedAt: Date
  ) {
    this.logger.info("Account activated successfully", {
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
  public logFailedAccountActivation(
    ipAddress: string,
    userEmail: string,
    userId: ObjectId,
    userJoinedAt: Date,
    errorMessage: string
  ) {
    this.logger.error("Failed to activate account", {
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
}
