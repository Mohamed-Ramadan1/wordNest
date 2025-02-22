// express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// service imports
import { ReadingListCRUDService } from "../services/readingListCRUD.service";

// interfaces imports
import { IReadingList } from "../interfaces/readingList.interface";
import {
  ReadingListCRUDRequestParams,
  CreateReadingListItemRequestBody,
} from "../interfaces/readingListCRUDRequest.interface";
export class ReadingListCRUDController {
  /**
   * Retrieves all reading list items.
   * Handles the request to get all items in the reading list.
   */
  public getAllReadingListItems = catchAsync(
    async (req: Request, res: Response) => {
      const { query, user } = req;
      const listItems = await ReadingListCRUDService.getAllReadingListItems(
        user._id,
        query
      );

      const response: ApiResponse<IReadingList[]> = {
        status: "success",
        message: "Reading list items retrieved successfully.",
        results: listItems.length,
        data: {
          readingListItems: listItems,
        },
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves a specific reading list item.
   * Handles the request to get a specific item from the reading list.
   */
  public getReadingListItem = catchAsync(
    async (req: Request<ReadingListCRUDRequestParams>, res: Response) => {
      const listItem = await ReadingListCRUDService.getReadingListItem(
        req.params.id,
        req.user._id
      );

      const response: ApiResponse<IReadingList> = {
        status: "success",
        message: "Reading list item retrieved successfully.",
        data: {
          readingListItem: listItem,
        },
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Creates a new reading list item.
   * Handles the request to create a new item in the reading list.
   */
  public createReadingListItem = catchAsync(
    async (
      req: Request<{}, {}, CreateReadingListItemRequestBody>,
      res: Response
    ) => {
      const notes = req.body.notes;
      await ReadingListCRUDService.createReadingListItem(
        req.user._id,
        req.body.blogPostId,
        notes ? notes : undefined
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reading list item created successfully.",
      };
      sendResponse(201, res, response);
    }
  );

  /**
   * Deletes a reading list item.
   * Handles the request to delete a specific item from the reading list.
   */
  public deleteReadingListItem = catchAsync(
    async (req: Request<ReadingListCRUDRequestParams>, res: Response) => {
      await ReadingListCRUDService.deleteReadingListItem(
        req.params.id,
        req.user._id
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reading list item deleted successfully.",
      };
      sendResponse(204, res, response);
    }
  );
}
