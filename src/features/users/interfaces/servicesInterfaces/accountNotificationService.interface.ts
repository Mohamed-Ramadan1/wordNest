import { ObjectId } from "mongoose";

/**
 * Interface for the AccountNotificationService class.
 * This interface outlines the methods for enabling and disabling user notifications.
 */
export interface IAccountNotificationService {
  /**
   * Enables notifications for the specified user.
   *
   * @param userId - The ObjectId of the user whose notifications are to be enabled.
   * @returns A promise that resolves once the notifications are successfully enabled.
   * @throws AppError - If the operation fails during the transaction.
   */
  enableNotifications(userId: ObjectId): Promise<void>;

  /**
   * Disables notifications for the specified user.
   *
   * @param userId - The ObjectId of the user whose notifications are to be disabled.
   * @returns A promise that resolves once the notifications are successfully disabled.
   * @throws AppError - If the operation fails during the transaction.
   */
  disableNotifications(userId: ObjectId): Promise<void>;
}
