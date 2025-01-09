import winston from "winston";
import { jsonFormatter } from "../formatters/jsonFormatter";
import { ObjectId } from "mongoose";

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/bandAccounts-logs.log" }),
  ],
});

// log success ban user account
export const logSuccessBanUserAccount = (
  adminUserEmail: string,
  adminUserId: ObjectId,
  bannedUserEmail: string,
  bannedUserId: ObjectId,
  banReason: string,
  banDays: number,
  ipAddress: string | undefined
) => {
  logger.info({
    message: "User account has been successfully banned ",
    adminUserEmail,
    adminUserId,
    bannedUserEmail,
    bannedUserId,
    banReason,
    banDays,
    ipAddress: ipAddress ? ipAddress : undefined,
    timestamp: new Date().toISOString(),
    service: "banUserAccountService",
  });
};

// log failed ban user account
export const logFailedBanUserAccount = (
  adminUserEmail: string,
  adminUserId: ObjectId,
  bannedUserEmail: string,
  bannedUserId: ObjectId,
  banReason: string,
  banDays: number,
  ipAddress: string | undefined,
  errorMessage: string
) => {
  logger.error({
    message: "Failed to ban user account",
    adminUserEmail,
    adminUserId,
    bannedUserEmail,
    bannedUserId,
    banReason,
    banDays,
    ipAddress: ipAddress ? ipAddress : undefined,
    error: errorMessage,
    timestamp: new Date().toISOString(),
    service: "banUserAccountService",
  });
};

// log success unban user account
export const logSuccessUnbanUserAccount = (
  adminUserEmail: string,
  adminUserId: ObjectId | string,
  unbannedUserEmail: string,
  unbannedUserId: ObjectId,
  ipAddress: string | undefined,
  adminUnbanComment: string
) => {
  logger.info({
    message: "User account has been successfully unbanned",
    adminUserEmail,
    adminUserId,
    unbannedUserEmail,
    unbannedUserId,
    ipAddress: ipAddress ? ipAddress : undefined,
    adminUnbanComment,
    timestamp: new Date().toISOString(),
    service: "banUserAccountService",
  });
};

// log failed unban user account
export const logFailedUnbanUserAccount = (
  adminUserEmail: string,
  adminUserId: ObjectId | string,
  unbannedUserEmail: string,
  unbannedUserId: ObjectId,
  ipAddress: string | undefined,
  adminUnbanComment: string,
  errorMessage: string
) => {
  logger.error({
    message: "Failed to unban user account",
    adminUserEmail,
    adminUserId,
    unbannedUserEmail,
    unbannedUserId,
    ipAddress: ipAddress ? ipAddress : undefined,
    adminUnbanComment,
    error: errorMessage,
    timestamp: new Date().toISOString(),
    service: "banUserAccountService",
  });
};
