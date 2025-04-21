// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { ApiResponse, catchAsync, IResponseUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IContentReportingManagementService,
  ReportManagementParams,
  UpdateReportStatusRequestBody,
  ProcessReportRequestBody,
} from "../interfaces/index";

/**
 * Controller for managing content reporting operations.
 * Handles HTTP requests related to processing, updating, archiving, and unarchiving content reports.
 */
@injectable()
export class ContentReportingManagementController {
  /**
   * Creates an instance of ContentReportingManagementController.
   * @param contentReportingManagementService - Service for managing content reporting operations.
   * @param responseUtils - Utility for sending standardized API responses.
   */
  constructor(
    @inject(TYPES.ContentReportingManagementService)
    private readonly contentReportingManagementService: IContentReportingManagementService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  /**
   * Processes a content report based on the provided data.
   * @param req - Express request object containing report ID in params and report data in body.
   * @param res - Express response object for sending the response.
   * @returns A promise that resolves when the report is processed successfully.
   */
  public processReport = catchAsync(
    async (
      req: Request<ReportManagementParams, {}, ProcessReportRequestBody>,
      res: Response
    ): Promise<void> => {
      await this.contentReportingManagementService.processReport(
        req.body.reportProcessedData,
        req.params.id
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report processed successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Updates the status of a content report.
   * @param req - Express request object containing report ID in params and new status in body.
   * @param res - Express response object for sending the response.
   * @returns A promise that resolves when the report status is updated successfully.
   */
  public updateReportStatus = catchAsync(
    async (
      req: Request<ReportManagementParams, {}, UpdateReportStatusRequestBody>,
      res: Response
    ): Promise<void> => {
      await this.contentReportingManagementService.updateReportStatus(
        req.params.id,
        req.body.reportStatus
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report status updated successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Archives a content report.
   * @param req - Express request object containing report ID in params.
   * @param res - Express response object for sending the response.
   * @returns A promise that resolves when the report is archived successfully.
   */
  public archiveReport = catchAsync(
    async (
      req: Request<ReportManagementParams>,
      res: Response
    ): Promise<void> => {
      await this.contentReportingManagementService.archiveReport(req.params.id);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report archived successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Un-archives a content report.
   * @param req - Express request object containing report ID in params.
   * @param res - Express response object for sending the response.
   * @returns A promise that resolves when the report is un-archived successfully.
   */
  public unarchiveReport = catchAsync(
    async (
      req: Request<ReportManagementParams>,
      res: Response
    ): Promise<void> => {
      await this.contentReportingManagementService.unarchiveReport(
        req.params.id
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report un-archived successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
