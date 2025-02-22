// Packages imports
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// utils imports
import { APIFeatures, AppError } from "@utils/index";
export class ReadingListManagementService {
  /**
   * Marks a specific reading list item as unread.
   */
  //! in progress
  public static async markListItemAsUnread() {
    // Implementation goes here
  }

  /**
   * Marks a specific reading list item as completed.
   */
  //! in progress
  public static async markListItemAsCompleted() {
    // Implementation goes here
  }

  /**
   * Marks a specific reading list item as currently being read.
   */
  //! in progress
  public static async markListItemAsReading() {
    // Implementation goes here
  }

  /**
   * Clears the entire reading list by removing all items.
   */
  //! in progress
  public static async clearReadingList() {
    // Implementation goes here
  }
}
