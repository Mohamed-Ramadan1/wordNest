// Packages imports
import { ObjectId } from "mongoose";
import { inject, injectable } from "inversify";
// shard imports
import { AppError, handleServiceError, TYPES } from "@shared/index";

// models imports
import { ReadingListModel } from "../models/readingList.model";

// interfaces imports
import {
  IReadingListManagementService,
  ReadingStatus,
  IReadingListRepository,
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
      const updatedListItem = await ReadingListModel.findOneAndUpdate({
        _id: listItemId,
        user: userId,
        status: ReadingStatus.UNREAD,
      });
      if (!updatedListItem) {
        throw new AppError("Reading list item not found.", 404);
      }
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
      const updatedListItem = await ReadingListModel.findOneAndUpdate({
        _id: listItemId,
        user: userId,
        status: ReadingStatus.COMPLETED,
      });
      if (!updatedListItem) {
        throw new AppError("Reading list item not found.", 404);
      }
      if (updatedListItem.autoRemove) {
        await ReadingListModel.deleteOne({ _id: listItemId });
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
      const updatedListItem = await ReadingListModel.findOneAndUpdate({
        _id: listItemId,
        user: userId,
        status: ReadingStatus.UNREAD,
      });
      if (!updatedListItem) {
        throw new AppError("Reading list item not found.", 404);
      }
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Clears the entire reading list by removing all items.
   */

  public async clearReadingList(userId: ObjectId): Promise<void> {
    try {
      const deletedItems = await ReadingListModel.deleteMany({ user: userId });
      if (!deletedItems.acknowledged) {
        throw new AppError("Failed to clear reading list", 400);
      }
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
