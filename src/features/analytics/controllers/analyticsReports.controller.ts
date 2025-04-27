/**
 * Controller for handling analytics reports-related HTTP requests.
 * Provides endpoints to fetch analytics reports for blogs, users, support tickets, and content reporting.
 */

// Import necessary modules and packages.
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

/**
 * AnalyticsReportsController class to manage analytics reports API endpoints.
 */
@injectable()
export class AnalyticsReportsController {
  /**
   * Constructs the AnalyticsReportsController with dependency injection.
   * @param responseUtils - Utility for formatting and sending HTTP responses.
   * @param analyticsReportsService - Service for fetching analytics reports.
   */
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils,
    @inject(TYPES.AnalyticsReportsService)
    private readonly analyticsReportsService: IAnalyticsReportsService
  ) {}

  /**
   * Fetches all blogs analytics reports based on request parameters.
   * @param req - The Express request object containing query parameters.
   * @param res - The Express response object.
   * @returns A promise that resolves to void after sending the response.
   */
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

  /**
   * Fetches all users analytics reports based on request parameters.
   * @param req - The Express request object containing query parameters.
   * @param res - The Express response object.
   * @returns A promise that resolves to void after sending the response.
   */
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

  /**
   * Fetches all support tickets analytics reports based on request parameters.
   * @param req - The Express request object containing query parameters.
   * @param res - The Express response object.
   * @returns A promise that resolves to void after sending the response.
   */
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

  /**
   * Fetches all content reporting analytics reports based on request parameters.
   * @param req - The Express request object containing query parameters.
   * @param res - The Express response object.
   * @returns A promise that resolves to void after sending the response.
   */
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
