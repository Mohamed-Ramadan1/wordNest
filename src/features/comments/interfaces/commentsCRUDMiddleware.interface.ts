// express imports
import { Request, Response, NextFunction } from "express";

/**
 * Interface defining middleware methods for validating comment CRUD requests.
 */
export interface ICommentCRUDMiddleware {
  /**
   * Middleware array to validate the creation of a comment.
   * Typically includes body validation, authentication, etc.
   *
   * @type {(req: Request, res: Response, next: NextFunction) => void}[]
   */
  validateCreateCommentRequest: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;

  /**
   * Middleware to validate the update of a comment.
   * Ensures the update request contains valid and authorized data.
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   *
   * @returns {void}
   */
  validateUpdateCommentRequest: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
