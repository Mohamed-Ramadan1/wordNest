// Packages imports
import { ObjectId } from "mongoose";
import { inject, injectable } from "inversify";
// shard imports
import { handleServiceError, TYPES } from "@shared/index";

// interfaces imports
import {
  IReadingListManagementService,
  ReadingStatus,
  IReadingListRepository,
  IReadingList,
} from "../interfaces/index";

@injectable()
export class ReadingListManagementService
  implements IReadingListManagementService
{
  constructor(
    @inject(TYPES.ReadingListRepository)
    private readingListRepository: IReadingListRepository
  ) {}
  /**
   * Marks a specific reading list item as unread.
   */

  public async markListItemAsUnread(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      await this.readingListRepository.updateReadingStatus(
        listItemId,
        userId,
        ReadingStatus.UNREAD
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Marks a specific reading list item as completed.
   */

  public async markListItemAsCompleted(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      const readingListItem: IReadingList =
        await this.readingListRepository.updateReadingStatus(
          listItemId,
          userId,
          ReadingStatus.COMPLETED
        );
      if (readingListItem.autoRemove) {
        await this.readingListRepository.deleteReadingListItem(
          listItemId,
          userId
        );
      }
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Marks a specific reading list item as currently being read.
   */

  public async markListItemAsReading(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      await this.readingListRepository.updateReadingStatus(
        listItemId,
        userId,
        ReadingStatus.READING
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Clears the entire reading list by removing all items.
   */

  public async clearReadingList(userId: ObjectId): Promise<void> {
    try {
      await this.readingListRepository.clearReadingList(userId);
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
