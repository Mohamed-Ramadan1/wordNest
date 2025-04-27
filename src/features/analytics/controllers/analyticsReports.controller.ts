// Import necessary modules and packages  .
import { Request, Response } from "express";

// package imports
import { inject, injectable } from "inversify";

// shared imports
import { ApiResponse, IResponseUtils, TYPES, catchAsync } from "@shared/index";

// interface imports
import {
  IAnalyticsReportsService,
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "../interfaces";

@injectable()
export class AnalyticsReportsController {
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils,
    @inject(TYPES.AnalyticsReportsService)
    private readonly analyticsReportsService: IAnalyticsReportsService
  ) {}

  public getAllBlogsAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const reports: IBlogsCollectionAnalytics[] =
        await this.analyticsReportsService.getAllBlogsAnalyticsReports(
          req.params
        );

      const response: ApiResponse<IBlogsCollectionAnalytics[]> = {
        status: "success",
        message: "Blogs analytics reports fetched successfully",
        results: reports.length,
        data: {
          reports,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  public getAllUsersAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const reports: IUsersCollectionAnalytics[] =
        await this.analyticsReportsService.getAllUsersAnalyticsReports(
          req.params
        );

      const response: ApiResponse<IUsersCollectionAnalytics[]> = {
        status: "success",
        message: "Users analytics reports fetched successfully",
        results: reports.length,
        data: {
          reports,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  public getAllSupportTicketsAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const reports: ISupportTicketsCollectionAnalytics[] =
        await this.analyticsReportsService.getAllSupportTicketsAnalyticsReports(
          req.params
        );

      const response: ApiResponse<ISupportTicketsCollectionAnalytics[]> = {
        status: "success",
        message: "Support tickets analytics reports fetched successfully",
        results: reports.length,
        data: {
          reports,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  public getAllContentReportingAnalyticsReports = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const reports: IContentReportingCollectionAnalytics[] =
        await this.analyticsReportsService.getAllContentReportingAnalyticsReports(
          req.params
        );

      const response: ApiResponse<IContentReportingCollectionAnalytics[]> = {
        status: "success",
        message: "Content reporting analytics reports fetched successfully",
        results: reports.length,
        data: {
          reports,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
