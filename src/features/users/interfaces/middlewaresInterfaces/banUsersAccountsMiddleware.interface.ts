// Express imports
import { NextFunction, Request, Response } from "express";

/**
 * Middleware class for handling user account ban/unban validation
 */
export interface IBanUserAccountMiddleware {
  /**
   * Validates the request before banning a user account
   * @param req - Express request object containing userId in params and ban details in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If validation fails or user cannot be banned
   */
  validateBanUserAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the request before unbanning a user account
   * @param req - Express request object containing userId in params and unban comment in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If validation fails or user cannot be unbanned
   */
  validateUnBanUserAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
