import { Request, Response, NextFunction } from "express";

export interface IContentReportingCRUDMiddleware {
  validateCreateContentReporting: Array<
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>
  >;

  validateDeleteContentReporting(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;
}
