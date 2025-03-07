// interfaces imports
import { IUser } from "@features/users_feature/interfaces/user.interface";

// Queues imports
import {
  emailQueue,
  bandAccountsQueue,
  BandAccountQueueJobs,
  EmailQueueJobs,
} from "@jobs/index";

// Config imports

// utils imports
import { AppError } from "@utils/appError";
// logger imports
import { banAccountsLogger } from "@logging/index";

// const banPeriodMs = 2 * 60 * 1000;
// interfaces imports
import { IBanUserAccountService } from "../../interfaces/index";
export class BanUserAccountService implements IBanUserAccountService {
  /**
   * Bans a user account.
   * Restricts the user's access to the platform by marking their account as banned.
   */
  public async banUserAccount(
    userToBeBaned: IUser,
    banReason: string,
    accountBandedDays: number,
    ipAddress: string | undefined,
    adminUser: IUser
  ): Promise<void> {
    try {
      userToBeBaned.isAccountBanned = true;
      userToBeBaned.accountBannedAt = new Date();
      userToBeBaned.accountBannedByAdminEmail = adminUser.email;
      userToBeBaned.accountBannedReason = banReason;
      userToBeBaned.accountBandPeriodDays = accountBandedDays;
      await userToBeBaned.save();

      // add email queue  to notify user by action
      emailQueue.add(EmailQueueJobs.AccountBanned, {
        user: userToBeBaned,
      });

      // add un ban queue to be processed after the ban period
      const banPeriodMs = accountBandedDays * 24 * 60 * 60 * 1000;
      bandAccountsQueue.add(
        BandAccountQueueJobs.UnBanAccount,
        {
          user: userToBeBaned,
        },
        {
          delay: banPeriodMs,
        }
      );

      // log success ban user account
      banAccountsLogger.logSuccessBanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeBaned.email,
        userToBeBaned._id,
        banReason,
        accountBandedDays,
        ipAddress
      );
    } catch (err: any) {
      banAccountsLogger.logFailedBanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeBaned.email,
        userToBeBaned._id,
        banReason,
        accountBandedDays,
        ipAddress,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Un-bans a user account.
   * Restores the user's access to the platform by removing the ban status.
   */
  public async unBanUserAccount(
    userToBeUnBaned: IUser,
    ipAddress: string | undefined,
    adminUnBanComment: string,
    adminUser: IUser
  ): Promise<void> {
    try {
      userToBeUnBaned.isAccountBanned = false;
      userToBeUnBaned.accountUnbannedAt = new Date();
      userToBeUnBaned.accountUnbannedBy = adminUser.email;
      userToBeUnBaned.accountUnbannedComment = adminUnBanComment;
      await userToBeUnBaned.save();

      // add email queue  to notify user by action
      emailQueue.add(EmailQueueJobs.AccountUnbanned, {
        user: userToBeUnBaned,
      });
      // log success un-ban user account
      banAccountsLogger.logSuccessUnbanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeUnBaned.email,
        userToBeUnBaned._id,
        ipAddress,
        adminUnBanComment
      );
    } catch (err: any) {
      banAccountsLogger.logFailedUnbanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeUnBaned.email,
        userToBeUnBaned._id,
        ipAddress,
        adminUnBanComment,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }
}
