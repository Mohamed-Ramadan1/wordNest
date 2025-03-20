import { Response, Request } from "express";
// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// service imports
import {
  IReadingListManagementService,
  ReadingListManagementRequestParams,
} from "../interfaces/index";

@injectable()
export class ReadingListManagementController {
  private readingListManagementService: IReadingListManagementService;
  constructor(
    @inject(TYPES.ReadingListManagementService)
    readingListManagementService: IReadingListManagementService
  ) {
    this.readingListManagementService = readingListManagementService;
  }
  /**
   * Marks a reading list item as unread.
   * This function updates the status of a specific item in the reading list to "unread".
   */
  public markListItemAsUnread = catchAsync(
    async (req: Request<ReadingListManagementRequestParams>, res: Response) => {
      await this.readingListManagementService.markListItemAsUnread(
        req.params.itemId,
        req.user._id
      );

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
    async (req: Request<ReadingListManagementRequestParams>, res: Response) => {
      await this.readingListManagementService.markListItemAsCompleted(
        req.params.itemId,
        req.user._id
      );

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
    async (req: Request<ReadingListManagementRequestParams>, res: Response) => {
      await this.readingListManagementService.markListItemAsReading(
        req.params.itemId,
        req.user._id
      );

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
    await this.readingListManagementService.clearReadingList(req.user._id);

    const response: ApiResponse<null> = {
      status: "success",
      message: "Reading list cleared successfully.",
    };

    sendResponse(200, res, response);
  });
}
