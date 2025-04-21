// express imports
import { Request, Response, NextFunction } from "express";

// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

// shard imports
import { AppError, catchAsync, TYPES, validateDto } from "@shared/index";

// interfaces imports
import {
  IContentReportingCRUDMiddleware,
  IContentReportRepository,
  ContentReportingRequestBody,
  ReportRequestData,
  ContentReportingRequestParams,
  DeleteReportRequestBody,
  DeleteReportData,
  IContentReporting,
} from "../interfaces/index";

// dtos imports
import { ValidateReportContentRequestDto } from "../dtos/index";

// blogs feature imports
import { IBlog } from "@features/blogs/interfaces/index";

/**
 * Middleware for validating CRUD operations related to content reporting.
 * Implements validation logic for creating and deleting content reports.
 */
@injectable()
export class ContentReportingCRUDMiddleware
  implements IContentReportingCRUDMiddleware
{
  /**
   * Creates an instance of ContentReportingCRUDMiddleware.
   * @param contentReportingRepository - Repository for accessing content reporting data.
   * @param blogModel - Mongoose model for interacting with blog data.
   */
  constructor(
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportingRepository: IContentReportRepository,
    @inject(TYPES.BlogModel)
    private readonly blogModel: Model<IBlog>
  ) {}

  /**
   * Middleware array for validating the creation of a content reporting request.
   * Validates the request body and ensures the referenced blog exists before constructing report data.
   * @param req - Express request object containing report data in the body.
   * @param res - Express response object for sending responses.
   * @param next - Express next function to pass control to the next middleware.
   * @returns A promise that resolves when validation and data preparation are complete, or throws an error if the blog is not found.
   */
  public validateCreateContentReporting = [
    validateDto(ValidateReportContentRequestDto),
    catchAsync(
      async (
        req: Request<{}, {}, ContentReportingRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { contentId, contentReportType, details } = req.body;

        const blog: IBlog | null = await this.blogModel.findById(contentId);

        if (!blog) {
          return next(
            new AppError(
              "Blog you want to create report on is not found review the content id and tray again.",
              404
            )
          );
        }

        const reportRequestData: ReportRequestData = {
          content: blog._id,
          type: contentReportType,
          details,
          user: req.user,
        };

        req.body.reportingRequestData = reportRequestData;
        next();
      }
    ),
  ];

  /**
   * Middleware for validating the deletion of a content reporting request.
   * Retrieves the report and constructs deletion data including report and content details.
   * @param req - Express request object containing report ID in params and optional body data.
   * @param res - Express response object for sending responses.
   * @param next - Express next function to pass control to the next middleware.
   * @returns A promise that resolves when validation and data preparation are complete.
   */
  public validateDeleteContentReporting = catchAsync(
    async (
      req: Request<ContentReportingRequestParams, {}, DeleteReportRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const reportRequest: IContentReporting =
        await this.contentReportingRepository.getContentReportById(
          req.params.id
        );
      const content = reportRequest.content as IBlog;
      const deleteRequestData: DeleteReportData = {
        reportId: reportRequest._id,
        contentId: content._id,
        adminId: req.user._id,
        ipAddress: req.ip as string,
      };

      req.body.deleteReportData = deleteRequestData;
      next();
    }
  );
}
