import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import { IReadingList } from "../interfaces/readingList.interface";

// service imports
import { ReadingListManagementService } from "../services/readingListManagement.service";

export class ReadingListManagementController {
  /**
   * Marks a reading list item as unread.
   * This function updates the status of a specific item in the reading list to "unread".
   */
  public markListItemAsUnread = catchAsync(
    async (req: Request, res: Response) => {
      await ReadingListManagementService.markListItemAsUnread();

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reading list item marked as unread successfully.",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Marks a reading list item as completed.
   * This function updates the status of a specific item in the reading list to "completed".
   */
  public markListItemAsCompleted = catchAsync(
    async (req: Request, res: Response) => {
      await ReadingListManagementService.markListItemAsCompleted();

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reading list item marked as completed successfully.",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Marks a reading list item as currently being read.
   * This function updates the status of a specific item in the reading list to "reading".
   */
  public markListItemAsReading = catchAsync(
    async (req: Request, res: Response) => {
      await ReadingListManagementService.markListItemAsReading();

      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Reading list item marked as currently being read successfully.",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Clears the entire reading list.
   * This function removes all items from the reading list.
   */
  public clearReadingList = catchAsync(async (req: Request, res: Response) => {
    await ReadingListManagementService.clearReadingList();

    const response: ApiResponse<null> = {
      status: "success",
      message: "Reading list cleared successfully.",
    };

    sendResponse(200, res, response);
  });
}
