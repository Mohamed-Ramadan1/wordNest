// Packages imports
import { ObjectId } from "mongoose";
import { inject, injectable } from "inversify";
// JOBS imports
import { readingListQueue, ReadingListQueueJobs } from "@jobs/index";

// shard imports
import { handleServiceError, TYPES } from "@shared/index";

// interfaces imports
import {
  IReadingListSettingsService,
  IReadingListRepository,
  ReminderAlertData,
} from "../interfaces/index";

@injectable()
export class ReadingListSettingsService implements IReadingListSettingsService {
  constructor(
    @inject(TYPES.ReadingListRepository)
    private readingListRepository: IReadingListRepository
  ) {}
  /**
   * Sets a reminder alert for a specific reading list item.
   */
  public async setReminderAlert(alertData: ReminderAlertData): Promise<void> {
    try {
      await this.readingListRepository.saveReminderAlertDate(
        alertData.readingItem,
        alertData.alertTime
      );
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
      handleServiceError(err);
    }
  }

  /**
   * Re-schedules an existing reminder alert for a reading list item.
   */
  public async reScheduleReminderAlert(
    alertData: ReminderAlertData,
    oldJobId: string
  ): Promise<void> {
    try {
      await readingListQueue.removeJobs(oldJobId);
      await this.readingListRepository.saveReminderAlertDate(
        alertData.readingItem,
        alertData.alertTime
      );
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
      handleServiceError(err);
    }
  }

  /**
   * Deletes a scheduled reminder alert for a reading list item.
   */

  public async deleteReminderAlert(
    itemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      await readingListQueue.removeJobs(itemId.toString());
      await this.readingListRepository.removeReminderAlertDate(itemId, userId);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Enables auto-removal of a reading list item when marked as "read."
   */
  public async allowAutoRemoveReadingListItem(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      await this.readingListRepository.toggleAutoRemovingListItem(
        listItemId,
        userId,
        true
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Disables auto-removal of a reading list item after being marked as "read."
   */
  public async disableAutoRemoveReadingListItem(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      await this.readingListRepository.toggleAutoRemovingListItem(
        listItemId,
        userId,
        false
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
