// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, IResponseUtils, TYPES } from "@shared/index";

// interfaces imports
import { IContentReportingCRUDService } from "../interfaces/index";

@injectable()
export class ContentReportingCRUDController {
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils,
    @inject(TYPES.ContentReportingCRUDService)
    private readonly contentReportingCRUDService: IContentReportingCRUDService
  ) {}

  public createReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for creating a report content request
    }
  );

  public getReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for creating a report content request
    }
  );

  public getAllReportContentRequests = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for creating a report content request
    }
  );
  public updateReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for creating a report content request
    }
  );
  public deleteReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for creating a report content request
    }
  );
}
