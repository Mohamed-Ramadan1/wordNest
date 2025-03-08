import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IBandAccountsLogger } from "../interfaces/bandAccountsLogger.interface";
// Configure Winston logger
// const bandAccountsLogger: Logger = createLogger("bandAccounts");
export class BandedAccountsLogger implements IBandAccountsLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("bandAccounts");
  }
  // log success ban user account
  public logSuccessBanUserAccount = (
    adminUserEmail: string,
    adminUserId: ObjectId,
    bannedUserEmail: string,
    bannedUserId: ObjectId,
    banReason: string,
    banDays: number,
    ipAddress: string | undefined
  ) => {
    this.logger.info({
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
  public logFailedBanUserAccount = (
    adminUserEmail: string,
    adminUserId: ObjectId,
    bannedUserEmail: string,
    bannedUserId: ObjectId,
    banReason: string,
    banDays: number,
    ipAddress: string | undefined,
    errorMessage: string
  ) => {
    this.logger.error({
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
  public logSuccessUnbanUserAccount = (
    adminUserEmail: string,
    adminUserId: ObjectId | string,
    unbannedUserEmail: string,
    unbannedUserId: ObjectId,
    ipAddress: string | undefined,
    adminUnbanComment: string
  ) => {
    this.logger.info({
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
  public logFailedUnbanUserAccount = (
    adminUserEmail: string,
    adminUserId: ObjectId | string,
    unbannedUserEmail: string,
    unbannedUserId: ObjectId,
    ipAddress: string | undefined,
    adminUnbanComment: string,
    errorMessage: string
  ) => {
    this.logger.error({
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
}
