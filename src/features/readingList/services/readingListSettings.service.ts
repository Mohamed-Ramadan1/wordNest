// Packages imports
import { ObjectId } from "mongoose";

// JOBS imports
import { readingListQueue, ReadingListQueueJobs } from "@jobs/index";

// utils imports
import { AppError } from "@utils/index";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

// models imports
import { ReadingListModel } from "../models/readingList.model";

// interfaces imports
import { ReminderAlertData } from "../interfaces/readingListSettingsRequest.interface";

export class ReadingListSettingsService {
  /**
   * Sets a reminder alert for a specific reading list item.
   */
  public static async setReminderAlert(
    alertData: ReminderAlertData
  ): Promise<void> {
    try {
      alertData.readingItem.lastInteractedAt = new Date();
      alertData.readingItem.reminderAlert = true;
      alertData.readingItem.reminderAlertTime = alertData.alertTime;
      await alertData.readingItem.save();
      readingListQueue.add(
        ReadingListQueueJobs.CreateReadingAlert,
        {
          user: alertData.user,
          blog: alertData.blog,
          readingItem: alertData.readingItem,
        },
        {
          delay: alertData.alertTime.getTime() - Date.now(),
          jobId: alertData.readingItem._id.toString(),
        }
      );
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
  public static async reScheduleReminderAlert(
    alertData: ReminderAlertData,
    oldJobId: string
  ): Promise<void> {
    try {
      await readingListQueue.removeJobs(oldJobId);
      alertData.readingItem.lastInteractedAt = new Date();
      alertData.readingItem.reminderAlert = true;
      alertData.readingItem.reminderAlertTime = alertData.alertTime;
      await alertData.readingItem.save();
      readingListQueue.add(
        ReadingListQueueJobs.CreateReadingAlert,
        {
          user: alertData.user,
          blog: alertData.blog,
          readingItem: alertData.readingItem,
        },
        {
          delay: alertData.alertTime.getTime() - Date.now(),
          jobId: alertData.readingItem._id.toString(),
        }
      );
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

  public static async deleteReminderAlert(
    itemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      await readingListQueue.removeJobs(itemId.toString());
      const updatedReadingListItem: IBlog | null =
        await ReadingListModel.findOneAndUpdate(
          { _id: itemId, user: userId },
          {
            $set: {
              reminderAlert: false,
              reminderAlertTime: null,
              lastInteractedAt: new Date(),
            },
          },
          { new: true }
        );
      if (!updatedReadingListItem) {
        throw new AppError("Reading list item not found.", 404);
      }
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
  public static async allowAutoRemoveReadingListItem(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      const updatedReadingListItem: IBlog | null =
        await ReadingListModel.findOneAndUpdate(
          { _id: listItemId, user: userId },
          {
            $set: {
              autoRemove: true,
              lastInteractedAt: new Date(),
            },
          },
          { new: true }
        );
      if (!updatedReadingListItem) {
        throw new AppError("Reading list item not found.", 404);
      }
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
  public static async disableAutoRemoveReadingListItem(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    console.log("get here");
    try {
      const updatedReadingListItem: IBlog | null =
        await ReadingListModel.findOneAndUpdate(
          { _id: listItemId, user: userId },
          {
            $set: {
              autoRemove: false,
              lastInteractedAt: new Date(),
            },
          },
          { new: true }
        );

      if (!updatedReadingListItem) {
        throw new AppError("Reading list item not found.", 404);
      }
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }
}
