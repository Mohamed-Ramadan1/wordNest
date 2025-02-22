// Packages imports
import { ObjectId } from "mongoose";

// utils imports
import { AppError } from "@utils/index";
import { ReadingStatus } from "../interfaces/readingList.interface";

// models imports
import { ReadingListModel } from "../models/readingList.model";
export class ReadingListManagementService {
  /**
   * Marks a specific reading list item as unread.
   */

  public static async markListItemAsUnread(
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
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Marks a specific reading list item as completed.
   */

  public static async markListItemAsCompleted(
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
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Marks a specific reading list item as currently being read.
   */

  public static async markListItemAsReading(
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
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Clears the entire reading list by removing all items.
   */

  public static async clearReadingList(userId: ObjectId): Promise<void> {
    try {
      const deletedItems = await ReadingListModel.deleteMany({ user: userId });
      if (!deletedItems.acknowledged) {
        throw new AppError("Failed to clear reading list", 400);
      }
    } catch (err: any) {
      if (err instanceof AppError) {
        throw Error;
      }
      throw new AppError(err.message, 500);
    }
  }
}
