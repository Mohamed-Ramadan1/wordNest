import { NextFunction, Request, Response } from "express";

/**
 * Middleware class for handling user account lock/unlock validation
 */
export interface ILockUserAccountMiddleware {
  /**
   * Validates the request before locking a user account
   * @param req - Express request object containing userId in params and lock details in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If validation fails or user account cannot be locked
   */
  validateLockAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the request before unlocking a user account
   * @param req - Express request object containing userId in params and unlock details in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If validation fails or user account cannot be unlocked
   */
  validateUnlockAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
