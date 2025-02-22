// Packages imports
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// utils imports
import { APIFeatures, AppError } from "@utils/index";

// services imports

export class ReadingListSettingsService {
  /**
   * Sets a reminder alert for a specific reading list item.
   */
  //! in progress
  public static async setReminderAlert() {
    // Implementation goes here
  }

  /**
   * Re-schedules an existing reminder alert for a reading list item.
   */
  //! in progress
  public static async reScheduleReminderAlert() {
    // Implementation goes here
  }

  /**
   * Deletes a scheduled reminder alert for a reading list item.
   */
  //! in progress
  public static async deleteReminderAlert() {
    // Implementation goes here
  }

  /**
   * Enables auto-removal of a reading list item when marked as "read."
   */
  //! in progress
  public static async allowAutoRemoveReadingListItem() {
    // Implementation goes here
  }

  /**
   * Disables auto-removal of a reading list item after being marked as "read."
   */
  //! in progress
  public static async disableAutoRemoveReadingListItem() {
    // Implementation goes here
  }
}
