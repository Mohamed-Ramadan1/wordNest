import winston from "winston";
import { jsonFormatter } from "../formatters/jsonFormatter";

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/auth-logs.log" }),
  ],
});

//  Log a successful login
export function logSuccessfulLogin(
  userEmail: string,
  ipAddress: string | undefined
) {
  logger.info("User logged in successfully", {
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
  logger.warn("Failed login attempt", {
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
  logger.info("User registered successfully", {
    event: "register",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}

// Log a failed register

export function logFailedRegister(userEmail: string, ipAddress: string) {
  logger.warn("Failed register attempt", {
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
  logger.info("User logged out successfully", {
    event: "logout",
    user: userEmail,
    ip: ipAddress,
    timestamp: new Date().toISOString(),
  });
}
