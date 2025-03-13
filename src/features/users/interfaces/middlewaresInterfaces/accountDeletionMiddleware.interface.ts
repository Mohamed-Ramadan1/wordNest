import { NextFunction, Request, Response } from "express";
import { IUser } from "../user.interface";

/**
 * Middleware class for handling account deletion validation
 */
export interface IAccountDeletionMiddleware {
  /**
   * Validates the request for account deletion
   * @param req - Express request object containing authenticated user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If user has exceeded maximum deletion requests within cooldown period
   */
  validateRequestAccountDeletion: (
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the confirmation of account deletion
   * @param req - Express request object containing deletion token in params
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If deletion token is invalid or expired
   */
  validateConfirmAccountDeletion: (
    req: Request<{ token: string }, {}, {}> & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => void;
}
