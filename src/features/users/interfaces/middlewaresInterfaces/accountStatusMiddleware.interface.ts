import { NextFunction, Request, Response } from "express";
import { IUser } from "../user.interface";

/**
 * Middleware class for handling account status (deactivation/activation) validation
 */
export interface IAccountStatusMiddleware {
  /**
   * Validates the request to deactivate an account
   * @param req - Express request object containing authenticated user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If account is already deactivated or max requests exceeded within cooldown
   */
  validateDeactivateAccountRequest: (
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the deactivation confirmation request
   * @param req - Express request object containing deactivation token in params
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If deactivation token is invalid or expired
   */
  validateDeactivateAccountConfirmation: (
    req: Request<{ token: string }, {}, {}> & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the account activation request
   * @param req - Express request object containing reactivation token in params
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If reactivation token is invalid or expired
   */
  validateActivateAccount: (
    req: Request<{ token: string }, {}, {}> & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => void;
}
