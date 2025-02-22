// Express imports
import { Response, Request } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// Shared interface imports
import { ApiResponse } from "@shared/index";

export class ReadingListSettingsController {
  /**
   * Sets a reminder alert for a specific reading list item.
   */
  public setReminderAlert = catchAsync(async (req: Request, res: Response) => {
    // Set reminder alert for user's reading list
  });

  /**
   * Re-schedules an existing reminder alert for a reading list item.
   */
  public reScheduleReminderAlert = catchAsync(
    async (req: Request, res: Response) => {
      // Re-schedule reminder alert for user's reading list
    }
  );

  /**
   * Deletes a scheduled reminder alert for a reading list item.
   */
  public deleteReminderAlert = catchAsync(
    async (req: Request, res: Response) => {
      // Delete reminder alert for user's reading list
    }
  );

  /**
   * Enables auto-removal of a reading list item when marked as "read."
   */
  public allowAutoRemoveReadingListItem = catchAsync(
    async (req: Request, res: Response) => {
      // Allow auto-removal of reading list item
    }
  );

  /**
   * Disables auto-removal of a reading list item after being marked as "read."
   */
  public disableAutoRemoveReadingListItem = catchAsync(
    async (req: Request, res: Response) => {
      // Disable auto-removal of reading list item
    }
  );
}
