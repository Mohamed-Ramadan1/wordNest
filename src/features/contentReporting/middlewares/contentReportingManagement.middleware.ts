// express imports
import { Request, Response, NextFunction } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, IErrorUtils, TYPES, validateDto } from "@shared/index";

// interfaces imports
import {
  IContentReportingManagementMiddleware,
  ProcessReportRequestBody,
  ProcessReportRequestData,
  ReportManagementParams,
} from "../interfaces/index";

// dto imports
import {
  ValidateProcessReportDto,
  ValidateUpdateReportStatusDto,
} from "../dtos/index";

/**
 * Middleware for validating content reporting management operations.
 * Implements validation logic for processing and updating report statuses.
 */
@injectable()
export class ContentReportingManagementMiddleware
  implements IContentReportingManagementMiddleware
{
  /**
   * Creates an instance of ContentReportingManagementMiddleware.
   * @param errorUtils - Utility for handling and formatting errors.
   */
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  /**
   * Middleware array for validating and preparing data for processing a report.
   * Validates the request body and constructs the report processed data.
   * @param req - Express request object containing report ID in params and report data in body.
   * @param res - Express response object for sending responses.
   * @param next - Express next function to pass control to the next middleware.
   * @returns A promise that resolves when validation and data preparation are complete.
   */
  public validateProcessReport = [
    validateDto(ValidateProcessReportDto),
    catchAsync(
      async (
        req: Request<ReportManagementParams, {}, ProcessReportRequestBody>,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const { processedNotes, resolutionType } = req.body;

        const reportProcessedData: ProcessReportRequestData = {
          processedNotes,
          resolutionType,
          processedBy: req.user._id,
          processedAt: new Date(),
        };
        req.body.reportProcessedData = reportProcessedData;
        next();
      }
    ),
  ];

  /**
   * Middleware array for validating the update report status request.
   * Validates the request body using the provided DTO.
   * @param req - Express request object containing the request data.
   * @param res - Express response object for sending responses.
   * @param next - Express next function to pass control to the next middleware.
   * @returns A promise that resolves when validation is complete.
   */
  public validateUpdateReportStatus = [
    validateDto(ValidateUpdateReportStatusDto),
    catchAsync(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        next();
      }
    ),
  ];
}
