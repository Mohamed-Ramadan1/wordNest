import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
import { IReadingList, ReadingStatus } from "../index";
/**
 * Interface for the Reading List Repository, providing methods to manage reading list items.
 * @interface IReadingListRepository
 */
export interface IReadingListRepository {
  /**
   * Retrieves all reading list items for a specific user with optional query filtering.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @param {ParsedQs} reqQuery - The query string object for filtering, sorting, and pagination.
   * @returns {Promise<IReadingList[]>} A promise that resolves to an array of reading list items.
   * @throws {Error} If an error occurs while retrieving the reading list items.
   */
  getUserReadingListItems(
    userId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IReadingList[]>;

  /**
   * Retrieves a specific reading list item by its ID for a given user.
   * @param {ObjectId} readingListItemId - The unique identifier of the reading list item.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @returns {Promise<IReadingList>} A promise that resolves to the reading list item.
   * @throws {Error} If the item is not found or an error occurs during retrieval.
   */
  getReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<IReadingList>;

  /**
   * Creates a new reading list item for a user.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @param {ObjectId} blogPostId - The unique identifier of the blog post to add.
   * @param {string | undefined} notes - Optional notes for the reading list item.
   * @returns {Promise<void>} A promise that resolves when the item is created.
   * @throws {Error} If the item creation fails or an error occurs.
   */
  createReadingListItem(
    userId: ObjectId,
    blogPostId: ObjectId,
    notes?: string
  ): Promise<void>;

  /**
   * Deletes a specific reading list item for a user.
   * @param {ObjectId} readingListItemId - The unique identifier of the reading list item.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @returns {Promise<void>} A promise that resolves when the item is deleted.
   * @throws {Error} If the item is not found or an error occurs during deletion.
   */
  deleteReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<void>;

  /**
   * Updates the reading status of a specific reading list item.
   * @param {ObjectId} listItemId - The unique identifier of the reading list item.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @param {ReadingStatus} readingStatus - The new reading status to set.
   * @returns {Promise<IReadingList>} A promise that resolves when the status is updated.
   * @throws {Error} If the item is not found or an error occurs during the update.
   */
  updateReadingStatus(
    listItemId: ObjectId,
    userId: ObjectId,
    readingStatus: ReadingStatus
  ): Promise<IReadingList>;

  /**
   * Clears all reading list items for a specific user.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @returns {Promise<void>} A promise that resolves when the reading list is cleared.
   * @throws {Error} If the operation fails or an error occurs.
   */
  clearReadingList(userId: ObjectId): Promise<void>;

  /**
   * Saves a reminder alert date for a reading list item.
   * @param {IReadingList} readingItem - The reading list item to update.
   * @param {Date} alertTime - The date and time for the reminder alert.
   * @returns {Promise<void>} A promise that resolves when the reminder is saved.
   * @throws {Error} If an error occurs while saving the reminder.
   */
  saveReminderAlertDate(
    readingItem: IReadingList,
    alertTime: Date
  ): Promise<void>;

  /**
   * Removes the reminder alert date from a reading list item.
   * @param {ObjectId} readingListItemId - The unique identifier of the reading list item.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @returns {Promise<void>} A promise that resolves when the reminder is removed.
   * @throws {Error} If the item is not found or an error occurs during removal.
   */
  removeReminderAlertDate(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<void>;

  /**
   * Toggles the auto-remove setting for a reading list item.
   * @param {ObjectId} listItemId - The unique identifier of the reading list item.
   * @param {ObjectId} userId - The unique identifier of the user.
   * @param {boolean} autoRemoved - The new auto-remove status.
   * @returns {Promise<void>} A promise that resolves when the setting is toggled.
   * @throws {Error} If the item is not found or an error occurs during the update.
   */
  toggleAutoRemovingListItem(
    listItemId: ObjectId,
    userId: ObjectId,
    autoRemoved: boolean
  ): Promise<void>;
}
