// express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shared interface imports
import { ApiResponse, IResponseUtils, TYPES, catchAsync } from "@shared/index";

// interfaces imports
import {
  IReadingList,
  IReadingListCRUDService,
  ReadingListCRUDRequestParams,
  CreateReadingListItemRequestBody,
} from "../interfaces/index";
@injectable()
export class ReadingListCRUDController {
  constructor(
    @inject(TYPES.ReadingListCRUDService)
    private readonly readingListCRUDService: IReadingListCRUDService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
  /**
   * Retrieves all reading list items.
   * Handles the request to get all items in the reading list.
   */
  public getAllReadingListItems = catchAsync(
    async (req: Request, res: Response) => {
      const { query, user } = req;
      const listItems =
        await this.readingListCRUDService.getAllReadingListItems(
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

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves a specific reading list item.
   * Handles the request to get a specific item from the reading list.
   */
  public getReadingListItem = catchAsync(
    async (req: Request<ReadingListCRUDRequestParams>, res: Response) => {
      const listItem = await this.readingListCRUDService.getReadingListItem(
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
      this.responseUtils.sendResponse(200, res, response);
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
      await this.readingListCRUDService.createReadingListItem(
        req.user._id,
        req.body.blogPostId,
        notes ? notes : undefined
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reading list item created successfully.",
      };
      this.responseUtils.sendResponse(201, res, response);
    }
  );

  /**
   * Deletes a reading list item.
   * Handles the request to delete a specific item from the reading list.
   */
  public deleteReadingListItem = catchAsync(
    async (req: Request<ReadingListCRUDRequestParams>, res: Response) => {
      await this.readingListCRUDService.deleteReadingListItem(
        req.params.id,
        req.user._id
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reading list item deleted successfully.",
      };
      this.responseUtils.sendResponse(204, res, response);
    }
  );
}
