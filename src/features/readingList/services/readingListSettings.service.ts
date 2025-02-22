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
  public static async setReminderAlert(): Promise<void> {
    try {
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Re-schedules an existing reminder alert for a reading list item.
   */
  //! in progress
  public static async reScheduleReminderAlert(): Promise<void> {
    try {
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Deletes a scheduled reminder alert for a reading list item.
   */
  //! in progress
  public static async deleteReminderAlert(): Promise<void> {
    try {
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Enables auto-removal of a reading list item when marked as "read."
   */
  //! in progress
  public static async allowAutoRemoveReadingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Disables auto-removal of a reading list item after being marked as "read."
   */
  //! in progress
  public static async disableAutoRemoveReadingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }
}
