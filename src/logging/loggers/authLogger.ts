import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";

// Configure Winston logger
const authLogger: Logger = createLogger("auth");

//  Log a successful login
export function logSuccessfulLogin(
  userEmail: string,
  ipAddress: string | undefined
) {
  authLogger.info("User logged in successfully", {
    event: "login",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}

//  Log a failed login
export function logFailedLogin(
  userEmail: string,
  ipAddress: string | undefined
) {
  authLogger.warn("Failed login attempt", {
    event: "login_failed",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}

// Log a success register
export function logSuccessfulRegister(
  userEmail: string,
  ipAddress: string | undefined
) {
  authLogger.info("User registered successfully", {
    event: "register",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}

// Log a failed register

export function logFailedRegister(userEmail: string, ipAddress: string) {
  authLogger.warn("Failed register attempt", {
    event: "register_failed",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}

// Log a successful logout
export function logSuccessfulLogout(
  userEmail: string,
  ipAddress: string | undefined
) {
  authLogger.info("User logged out successfully", {
    event: "logout",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}

// Log successful request reset password
export function logSuccessfulPasswordReset(
  userEmail: string,
  userId: ObjectId,

  ipAddress: string | undefined
) {
  authLogger.info("User requested password reset successfully", {
    event: "password_reset",
    user: userEmail,
    userID: userId,
    ip: ipAddress,

    timestamp: new Date().toISOString(),
  });
}

// Logo failure request reset password
export function logFailedPasswordReset(
  userEmail: string,
  ipAddress: string | undefined,
  userId: ObjectId,
  errorMessage: string
) {
  authLogger.warn("Failed password reset attempt", {
    event: "password_reset_failed",
    user: userEmail,
    userID: userId,
    ip: ipAddress,
    error: errorMessage,
    timestamp: new Date().toISOString(),
  });
}
