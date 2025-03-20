import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IAuthLogger } from "../interfaces/authLogger.interface";

export class AuthLogger implements IAuthLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("auth");
  }

  //  Log a successful login
  public logSuccessfulLogin(userEmail: string, ipAddress: string | undefined) {
    this.logger.info("User logged in successfully", {
      event: "login",
      user: userEmail,
      ip: ipAddress,
      timestamp: new Date().toISOString(),
    });
  }

  //  Log a failed login
  public logFailedLogin(
    userEmail: string,
    ipAddress: string | undefined,
    errMessage: string
  ) {
    this.logger.warn("Failed login attempt", {
      event: "login_failed",
      user: userEmail,
      ip: ipAddress,
      error: errMessage,
      timestamp: new Date().toISOString(),
    });
  }

  // Log a success register
  public logSuccessfulRegister(
    userEmail: string,
    ipAddress: string | undefined
  ) {
    this.logger.info("User registered successfully", {
      event: "register",
      user: userEmail,
      ip: ipAddress,
      timestamp: new Date().toISOString(),
    });
  }

  // Log a failed register

  public logFailedRegister(userEmail: string, ipAddress: string) {
    this.logger.warn("Failed register attempt", {
      event: "register_failed",
      user: userEmail,
      ip: ipAddress,
      timestamp: new Date().toISOString(),
    });
  }

  // Log a successful logout
  public logSuccessfulLogout(userEmail: string, ipAddress: string | undefined) {
    this.logger.info("User logged out successfully", {
      event: "logout",
      user: userEmail,
      ip: ipAddress,
      timestamp: new Date().toISOString(),
    });
  }

  // Log successful request reset password
  public logSuccessfulPasswordReset(
    userEmail: string,
    userId: ObjectId,

    ipAddress: string | undefined
  ) {
    this.logger.info("User requested password reset successfully", {
      event: "password_reset",
      user: userEmail,
      userID: userId,
      ip: ipAddress,

      timestamp: new Date().toISOString(),
    });
  }

  // Logo failure request reset password
  public logFailedPasswordReset(
    userEmail: string,
    ipAddress: string | undefined,
    userId: ObjectId,
    errorMessage: string
  ) {
    this.logger.warn("Failed password reset attempt", {
      event: "password_reset_failed",
      user: userEmail,
      userID: userId,
      ip: ipAddress,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
