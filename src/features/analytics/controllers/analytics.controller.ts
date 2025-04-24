// Import necessary modules and packages  .
import { Request, Response } from "express";

// package imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// shared imports
import { ApiResponse, IResponseUtils, TYPES, catchAsync } from "@shared/index";

// interface imports

@injectable()
export class AnalyticsController {
  constructor() {}

  public getBlogAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );

  public getUserAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );

  public getSupportTicketAnalytics = catchAsync(
    async (req: Request, res: Response): Promise<void> => {}
  );
}
