//express imports
import { Request, Response, NextFunction } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, TYPES, validateDto } from "@shared/index";

// interfaces imports
import {
  IContentReportingCRUDMiddleware,
  IContentReportRepository,
  ContentReportingRequestBody,
  ContentReportingRequestParams,
  ReportRequestData,
} from "../interfaces/index";

//dtos imports
import { ValidateReportContentRequestDto } from "../dtos/index";

@injectable()
export class ContentReportingCRUDMiddleware
  implements IContentReportingCRUDMiddleware
{
  constructor(
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportingRepository: IContentReportRepository
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
      }
    ),
  ];
}
