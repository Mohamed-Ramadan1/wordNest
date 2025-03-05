import { IUser } from "./user.interface";
/**
 * Interface for the BanUserAccountService.
 * This service is responsible for banning and unbanning user accounts,
 * as well as managing the associated notifications and logging.
 */
export interface IBanUserAccountService {
  /**
   * Bans a user account, restricting their access to the platform.
   * This method updates the user's account status to banned, adds them to the ban queue,
   * and sends an email notification to the user.
   *
   * @param userToBeBaned - The user object to be banned.
   * @param banReason - The reason for banning the user.
   * @param accountBandedDays - The duration of the ban in days.
   * @param ipAddress - The IP address of the admin performing the ban.
   * @param adminUser - The admin performing the ban action.
   * @returns Promise<void> - A promise indicating the result of the ban action.
   */
  banUserAccount(
    userToBeBaned: IUser,
    banReason: string,
    accountBandedDays: number,
    ipAddress: string | undefined,
    adminUser: IUser
  ): Promise<void>;

  /**
   * Un-bans a user account, restoring their access to the platform.
   * This method updates the user's account status to unbanned, removes the ban,
   * and sends an email notification to the user.
   *
   * @param userToBeUnBaned - The user object to be unbanned.
   * @param ipAddress - The IP address of the admin performing the unban.
   * @param adminUnBanComment - The comment made by the admin regarding the unban.
   * @param adminUser - The admin performing the unban action.
   * @returns Promise<void> - A promise indicating the result of the unban action.
   */
  unBanUserAccount(
    userToBeUnBaned: IUser,
    ipAddress: string | undefined,
    adminUnBanComment: string,
    adminUser: IUser
  ): Promise<void>;
}
