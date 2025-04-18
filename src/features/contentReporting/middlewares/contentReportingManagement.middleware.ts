//express imports
import { Request, Response, NextFunction } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, IErrorUtils, TYPES, validateDto } from "@shared/index";

// interfaces imports
import { IContentReportingManagementMiddleware } from "../interfaces/index";

// dto imports
import {
  ValidateProcessReportDto,
  ValidateUpdateReportStatusDto,
} from "../dtos/index";

@injectable()
export class ContentReportingManagementMiddleware
  implements IContentReportingManagementMiddleware
{
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  public validateProcessReport = [
    validateDto(ValidateProcessReportDto),
    catchAsync(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {}
    ),
  ];

  public validateUpdateReportStatus = [
    validateDto(ValidateUpdateReportStatusDto),
    catchAsync(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {}
    ),
  ];
}
