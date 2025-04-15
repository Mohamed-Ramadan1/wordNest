//express imports
import { Request, Response, NextFunction } from "express";

//packages imports
import { inject, injectable } from "inversify";
import { Model, ObjectId } from "mongoose";

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

//dtos imports
import { ValidateReportContentRequestDto } from "../dtos/index";

// blogs feature imports
import { IBlog } from "@features/blogs/interfaces/index";

@injectable()
export class ContentReportingCRUDMiddleware
  implements IContentReportingCRUDMiddleware
{
  constructor(
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportingRepository: IContentReportRepository,
    @inject(TYPES.BlogModel)
    private readonly blogModel: Model<IBlog>
  ) {}

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
          user: req.user._id,
        };

        req.body.reportingRequestData = reportRequestData;
        next();
      }
    ),
  ];

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
