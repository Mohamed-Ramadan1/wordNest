// express imports
import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, IResponseUtils, TYPES } from "@shared/index";

@injectable()
export class ContentReportingManagementController {
  // Add your controller methods here
  constructor(
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  public processReport = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Your logic here
    }
  );

  public updateReportStatus = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      // Your logic here
    }
  );

  public archiveReport = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );

  public unarchiveReport = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );
}
