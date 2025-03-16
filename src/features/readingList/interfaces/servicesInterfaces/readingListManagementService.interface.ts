import { ObjectId } from "mongoose";

/**
 * Interface for the ReadingListManagementService class.
 * Defines methods for managing reading list items, such as marking items as unread, completed, reading, and clearing the list.
 */
export interface IReadingListManagementService {
  /**
   * Marks a specific reading list item as unread.
   * @param listItemId - The ID of the reading list item to be marked as unread.
   * @param userId - The user ID who owns the reading list item.
   * @returns A promise that resolves to void.
   */
  markListItemAsUnread(listItemId: ObjectId, userId: ObjectId): Promise<void>;

  /**
   * Marks a specific reading list item as completed.
   * @param listItemId - The ID of the reading list item to be marked as completed.
   * @param userId - The user ID who owns the reading list item.
   * @returns A promise that resolves to void.
   */
  markListItemAsCompleted(
    listItemId: ObjectId,
    userId: ObjectId
  ): Promise<void>;

  /**
   * Marks a specific reading list item as currently being read.
   * @param listItemId - The ID of the reading list item to be marked as reading.
   * @param userId - The user ID who owns the reading list item.
   * @returns A promise that resolves to void.
   */
  markListItemAsReading(listItemId: ObjectId, userId: ObjectId): Promise<void>;

  /**
   * Clears the entire reading list by removing all items.
   * @param userId - The user ID whose reading list is to be cleared.
   * @returns A promise that resolves to void.
   */
  clearReadingList(userId: ObjectId): Promise<void>;
}
