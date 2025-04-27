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

/**
 * Controller for handling analytics-related HTTP requests.
 * This class provides endpoints to retrieve analytics data for blogs, users,
 * support tickets, and content reporting, utilizing the AnalyticsService and ResponseUtils.
 */
@injectable()
export class AnalyticsController {
  /**
   * Creates an instance of AnalyticsController.
   * @param analyticsService - The service responsible for fetching analytics data.
   * @param responseUtils - Utility for formatting and sending HTTP responses.
   */
  constructor(
    @inject(TYPES.AnalyticsService)
    private readonly analyticsService: IAnalyticsService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  /**
   * Handles HTTP request to retrieve blogs analytics.
   * Fetches analytics data using the AnalyticsService and sends a formatted response.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A promise that resolves to void, indicating the response has been sent.
   * @example
   * // Example route: GET /analytics/blogs
   * app.get('/analytics/blogs', analyticsController.getBlogAnalytics);
   */
  public getBlogAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const blogsAnalytics: IBlogsCollectionAnalytics =
        await this.analyticsService.getBlogsAnalytics();
      const response: ApiResponse<IBlogsCollectionAnalytics> = {
        status: "success",
        message: "Blogs analytics fetched successfully",
        data: {
          analytics: blogsAnalytics,
        },
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Handles HTTP request to retrieve users analytics.
   * Fetches analytics data using the AnalyticsService and sends a formatted response.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A promise that resolves to void, indicating the response has been sent.
   * @example
   * // Example route: GET /analytics/users
   * app.get('/analytics/users', analyticsController.getUserAnalytics);
   */
  public getUserAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const usersAnalytics: IUsersCollectionAnalytics =
        await this.analyticsService.getUsersAnalytics();
      const response: ApiResponse<IUsersCollectionAnalytics> = {
        status: "success",
        message: "Users analytics fetched successfully",
        data: {
          analytics: usersAnalytics,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Handles HTTP request to retrieve support tickets analytics.
   * Fetches analytics data using the AnalyticsService and sends a formatted response.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A promise that resolves to void, indicating the response has been sent.
   * @example
   * // Example route: GET /analytics/support-tickets
   * app.get('/analytics/support-tickets', analyticsController.getSupportTicketAnalytics);
   */
  public getSupportTicketAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const supportTicketsAnalytics: ISupportTicketsCollectionAnalytics =
        await this.analyticsService.getSupportTicketsAnalytics();
      const response: ApiResponse<ISupportTicketsCollectionAnalytics> = {
        status: "success",
        message: "Support ticket analytics fetched successfully",
        data: {
          analytics: supportTicketsAnalytics,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Handles HTTP request to retrieve content reporting analytics.
   * Fetches analytics data using the AnalyticsService and sends a formatted response.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A promise that resolves to void, indicating the response has been sent.
   * @example
   * // Example route: GET /analytics/content-reporting
   * app.get('/analytics/content-reporting', analyticsController.getContentReportingAnalytics);
   */
  public getContentReportingAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const contentReportingAnalytics: IContentReportingCollectionAnalytics =
        await this.analyticsService.getContentReportingAnalytics();
      const response: ApiResponse<IContentReportingCollectionAnalytics> = {
        status: "success",
        message: "Content reporting analytics fetched successfully",
        data: {
          analytics: contentReportingAnalytics,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
