import { ObjectId } from "mongoose";

import { ReminderAlertData } from "../index";

/**
 * Interface for the ReadingListSettingsService class.
 * Defines methods for managing reminder alerts and auto-remove settings for reading list items.
 */
export interface IReadingListSettingsService {
  /**
   * Sets a reminder alert for a specific reading list item.
   * @param alertData - The alert data containing reading item, alert time, user, and blog information.
   * @returns A promise that resolves to void.
   */
  setReminderAlert(alertData: ReminderAlertData): Promise<void>;

  /**
   * Re-schedules an existing reminder alert for a reading list item.
   * @param alertData - The alert data containing reading item, alert time, user, and blog information.
   * @param oldJobId - The ID of the previous reminder alert job.
   * @returns A promise that resolves to void.
   */
  reScheduleReminderAlert(
    alertData: ReminderAlertData,
    oldJobId: string
  ): Promise<void>;

  /**
   * Deletes a scheduled reminder alert for a reading list item.
   * @param itemId - The ID of the reading list item whose reminder alert is to be deleted.
   * @param userId - The user ID who owns the reading list item.
   * @returns A promise that resolves to void.
   */
  deleteReminderAlert(itemId: ObjectId, userId: ObjectId): Promise<void>;

  /**
   * Enables auto-removal of a reading list item when marked as "read."
   * @param listItemId - The ID of the reading list item to enable auto-removal.
   * @param userId - The user ID who owns the reading list item.
   * @returns A promise that resolves to void.
   */
  allowAutoRemoveReadingListItem(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void>;

  /**
   * Disables auto-removal of a reading list item after being marked as "read."
   * @param listItemId - The ID of the reading list item to disable auto-removal.
   * @param userId - The user ID who owns the reading list item.
   * @returns A promise that resolves to void.
   */
  disableAutoRemoveReadingListItem(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void>;
}
