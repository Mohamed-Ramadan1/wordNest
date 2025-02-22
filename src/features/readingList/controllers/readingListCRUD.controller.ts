//express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

export class ReadingListCRUDController {
  public getAllReadingListItems = catchAsync(
    async (req: Request, res: Response) => {
      // Retrieve all reading list items
    }
  );
  public getReadingListItem = catchAsync(
    async (req: Request, res: Response) => {
      // Retrieve a specific reading list item
    }
  );

  public createReadingListItem = catchAsync(
    async (req: Request, res: Response) => {
      // Create a new reading list item
    }
  );

  public updateReadingListItem = catchAsync(
    async (req: Request, res: Response) => {
      // Update a specific reading list item
    }
  );

  public deleteReadingListItem = catchAsync(
    async (req: Request, res: Response) => {
      // Delete a specific reading list item
    }
  );
}
