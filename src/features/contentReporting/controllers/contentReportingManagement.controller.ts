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
} from "../interfaces/index";
@injectable()
export class ContentReportingManagementController {
  // Add your controller methods here
  constructor(
    @inject(TYPES.ContentReportingManagementService)
    private readonly contentReportingManagementService: IContentReportingManagementService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  public processReport = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await this.contentReportingManagementService.processReport();

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report processed successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  public updateReportStatus = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await this.contentReportingManagementService.updateReportStatus();

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report status updated successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

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
