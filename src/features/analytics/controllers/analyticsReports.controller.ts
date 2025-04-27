// Import necessary modules and packages  .
import { Request, Response } from "express";

// package imports
import { inject, injectable } from "inversify";

// shared imports
import { ApiResponse, IResponseUtils, TYPES, catchAsync } from "@shared/index";

// interface imports
import {
  IAnalyticsService,
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "../interfaces";

@injectable()
export class AnalyticsReportsController {
  constructor(
    @inject(TYPES.AnalyticsService)
    private readonly analyticsService: IAnalyticsService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  public getAllBlogsAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );

  public getAllUsersAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );

  public getAllSupportTicketsAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );

  public getAllContentReportingAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );
}
