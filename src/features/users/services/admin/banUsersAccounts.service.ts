//packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// Queues imports
import {
  emailQueue,
  bandAccountsQueue,
  BandAccountQueueJobs,
  EmailQueueJobs,
} from "@jobs/index";

// utils imports
import { IErrorUtils, TYPES } from "@shared/index";
// logger imports
import { IBandAccountsLogger } from "@logging/interfaces";
// const banPeriodMs = 2 * 60 * 1000;

// interfaces imports
import {
  IBanUserAccountService,
  IUserManagementRepository,
} from "../../interfaces/index";

@injectable()
export class BanUserAccountService implements IBanUserAccountService {
  constructor(
    @inject(TYPES.BandedAccountsLogger)
    private readonly bandAccountsLogger: IBandAccountsLogger,
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
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
      await this.userManagementRepository.banUser(
        userToBeBaned,
        adminUser,
        banReason,
        accountBandedDays
      );

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
      this.bandAccountsLogger.logSuccessBanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeBaned.email,
        userToBeBaned._id,
        banReason,
        accountBandedDays,
        ipAddress
      );
    } catch (err: any) {
      this.bandAccountsLogger.logFailedBanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeBaned.email,
        userToBeBaned._id,
        banReason,
        accountBandedDays,
        ipAddress,
        err.message
      );
      this.errorUtils.handleServiceError(err);
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
      await this.userManagementRepository.unBanUser(
        userToBeUnBaned,
        adminUnBanComment,
        adminUser
      );

      // add email queue  to notify user by action
      emailQueue.add(EmailQueueJobs.AccountUnbanned, {
        user: userToBeUnBaned,
      });
      // log success un-ban user account
      this.bandAccountsLogger.logSuccessUnbanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeUnBaned.email,
        userToBeUnBaned._id,
        ipAddress,
        adminUnBanComment
      );
    } catch (err: any) {
      this.bandAccountsLogger.logFailedUnbanUserAccount(
        adminUser.email,
        adminUser._id,
        userToBeUnBaned.email,
        userToBeUnBaned._id,
        ipAddress,
        adminUnBanComment,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }
}
