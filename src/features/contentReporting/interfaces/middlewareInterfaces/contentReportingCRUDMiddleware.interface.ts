import { Request, Response, NextFunction } from "express";

/**
 * Interface for middleware related to content reporting CRUD operations.
 */
export interface IContentReportingCRUDMiddleware {
  /**
   * Middleware chain to validate the request body for creating a content report.
   *
   * Each middleware function in the array receives the request, response, and next function,
   * and can either proceed to the next middleware or throw a validation error.
   */
  validateCreateContentReporting: Array<
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>
  >;

  /**
   * Middleware to validate the request for deleting a content report.
   *
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function to pass control to the next middleware.
   */
  validateDeleteContentReporting(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}
