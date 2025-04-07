// express imports
import { Request, Response, NextFunction } from "express";

export interface ICommentCRUDMiddleware {
  validateCreateCommentRequest: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;

  validateUpdateCommentRequest: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
