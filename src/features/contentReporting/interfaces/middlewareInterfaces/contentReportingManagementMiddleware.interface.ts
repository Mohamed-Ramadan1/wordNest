import { Response, Request, NextFunction } from "express";

/**
 * Interface for the Content Reporting Management Middleware.
 * Defines middleware functions for validating content reporting operations.
 */
export interface IContentReportingManagementMiddleware {
  /**
   * Array of middleware functions to validate the process report request.
   * @param req - The Express request object containing the request data.
   * @param res - The Express response object for sending responses.
   * @param next - The Express next function to pass control to the next middleware.
   */
  validateProcessReport: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;

  /**
   * Array of middleware functions to validate the update report status request.
   * @param req - The Express request object containing the request data.
   * @param res - The Express response object for sending responses.
   * @param next - The Express next function to pass control to the next middleware.
   */
  validateUpdateReportStatus: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}
