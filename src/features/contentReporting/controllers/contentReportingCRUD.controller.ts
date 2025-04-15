// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shared imports
import { ApiResponse, catchAsync, IResponseUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IContentReporting,
  IContentReportingCRUDService,
  ContentReportingRequestBody,
  DeleteReportRequestBody,
  ContentReportingRequestParams,
} from "../interfaces/index";

/**
 * Controller responsible for handling content reporting CRUD operations.
 */
@injectable()
export class ContentReportingCRUDController {
  /**
   * Constructs the ContentReportingCRUDController.
   *
   * @param responseUtils - Utility service for formatting and sending API responses.
   * @param contentReportingCRUDService - Service layer handling the business logic for content reports.
   */
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils,
    @inject(TYPES.ContentReportingCRUDService)
    private readonly contentReportingCRUDService: IContentReportingCRUDService
  ) {}

  /**
   * Handles creating a content report request.
   *
   * @param req - Express request containing the reporting data in the body.
   * @param res - Express response object used to send back the result.
   */
  public createReportContentRequest = catchAsync(
    async (
      req: Request<{}, {}, ContentReportingRequestBody>,
      res: Response
    ): Promise<void> => {
      await this.contentReportingCRUDService.createReportContentRequest(
        req.body.reportingRequestData
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report content request created successfully",
      };

      this.responseUtils.sendResponse(201, res, response);
    }
  );

  /**
   * Retrieves a single content report request by its ID.
   *
   * @param req - Express request containing the report ID in the route parameters.
   * @param res - Express response object used to send back the result.
   */
  public getReportContentRequest = catchAsync(
    async (
      req: Request<ContentReportingRequestParams>,
      res: Response
    ): Promise<void> => {
      const reportRequest =
        await this.contentReportingCRUDService.getReportContentRequest(
          req.params.id
        );

      const response: ApiResponse<IContentReporting> = {
        status: "success",
        message: "Report content request fetched successfully",
        data: {
          request: reportRequest,
        },
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves all content report requests with optional filters from the query parameters.
   *
   * @param req - Express request that may contain filter or pagination query parameters.
   * @param res - Express response object used to send back the list of report requests.
   */
  public getAllReportContentRequests = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const reportsRequests =
        await this.contentReportingCRUDService.getAllReportContentRequests(
          req.query
        );

      const response: ApiResponse<IContentReporting[]> = {
        status: "success",
        message: "Report content requests fetched successfully",
        results: reportsRequests.length,
        data: {
          requests: reportsRequests,
        },
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Deletes a specific content report request.
   *
   * @param req - Express request containing the deleteReportData in the body.
   * @param res - Express response object used to confirm deletion.
   */
  public deleteReportContentRequest = catchAsync(
    async (
      req: Request<{}, {}, DeleteReportRequestBody>,
      res: Response
    ): Promise<void> => {
      await this.contentReportingCRUDService.deleteReportContentRequest(
        req.body.deleteReportData
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report content request deleted successfully",
      };

      this.responseUtils.sendResponse(204, res, response);
    }
  );
}
