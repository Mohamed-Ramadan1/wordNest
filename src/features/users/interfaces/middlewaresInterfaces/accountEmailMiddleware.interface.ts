import { NextFunction, Request, Response } from "express";
import { IUser } from "../user.interface";

/**
 * Middleware class for handling account email change validation
 */
export interface IAccountEmailMiddleware {
  /**
   * Validates the email change request
   * @param req - Express request object containing authenticated user and new email in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If new email is missing or validation fails
   */
  validateChangeEmailRequest: (
    req: Request<{}, {}, { newEmail?: string }> & { user: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the email change confirmation request
   * @param req - Express request object containing change email token in params
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If change email token is invalid or expired
   */
  validateConfirmEmailChange: (
    req: Request<{ token: string }, {}, {}> & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the new email ownership verification request
   * @param req - Express request object containing temporary verification token in params
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If temporary change email token is invalid or expired
   */
  validateVerifyNewEmailOwnership: (
    req: Request<{ token: string }, {}, {}> & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the resend email verification token request
   * @param req - Express request object containing authenticated user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If email change request isn't confirmed, no temp email exists, or too many attempts
   */
  validateResendNewEmailVerificationToken: (
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) => void;
}
