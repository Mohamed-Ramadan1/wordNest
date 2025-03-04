import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import { IReadingList } from "../interfaces/readingList.interface";

/**
 * Interface for the ReadingListCRUDService class.
 * Defines methods for CRUD operations related to reading list items.
 */
export interface IReadingListCRUDService {
  /**
   * Retrieves all reading list items for a specific user.
   * @param userId - The user ID whose reading list items are to be fetched.
   * @param reqQuery - Query parameters for pagination and filtering.
   * @returns A promise that resolves to an array of reading list items.
   */
  getAllReadingListItems(
    userId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IReadingList[]>;

  /**
   * Retrieves a specific reading list item for a user.
   * @param readingListItemId - The ID of the reading list item to retrieve.
   * @param userId - The user ID to whom the reading list item belongs.
   * @returns A promise that resolves to a specific reading list item.
   */
  getReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<IReadingList>;

  /**
   * Creates a new reading list item.
   * @param userId - The user ID who owns the reading list item.
   * @param blogPostId - The ID of the blog post to be added to the reading list.
   * @param notes - Optional notes for the reading list item.
   * @returns A promise that resolves to void.
   */
  createReadingListItem(
    userId: ObjectId,
    blogPostId: ObjectId,
    notes: string | undefined
  ): Promise<void>;

  /**
   * Deletes a reading list item.
   * @param readingListItemId - The ID of the reading list item to be deleted.
   * @param userId - The user ID to whom the reading list item belongs.
   * @returns A promise that resolves to void.
   */
  deleteReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<void>;
}
