// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { ApiResponse, catchAsync, IResponseUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IContentReporting,
  IContentReportingCRUDService,
  ContentReportingRequestBody,
  ReportRequestData,
} from "../interfaces/index";

@injectable()
export class ContentReportingCRUDController {
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils,
    @inject(TYPES.ContentReportingCRUDService)
    private readonly contentReportingCRUDService: IContentReportingCRUDService
  ) {}

  public createReportContentRequest = catchAsync(
    async (
      req: Request<{}, {}, ContentReportingRequestBody>,
      res: Response
    ): Promise<void> => {
      // Implement the logic for creating a report content request
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

  public getReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for getting a report content request
      const reportRequest =
        await this.contentReportingCRUDService.getReportContentRequest();

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

  public getAllReportContentRequests = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Implement the logic for creating a report content request
      const reportsRequests =
        await this.contentReportingCRUDService.getAllReportContentRequests();

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
  public updateReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await this.contentReportingCRUDService.updateReportContentRequest();
      const response: ApiResponse<null> = {
        status: "success",
        message: "Report content request updated successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
  public deleteReportContentRequest = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      await this.contentReportingCRUDService.deleteReportContentRequest();

      const response: ApiResponse<null> = {
        status: "success",
        message: "Report content request deleted successfully",
      };
      this.responseUtils.sendResponse(204, res, response);
    }
  );
}
