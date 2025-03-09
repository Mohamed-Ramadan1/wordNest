import { Request, Response, NextFunction } from "express";

/**
 * Interface for Account Recovery Middleware functions.
 * This interface defines the structure of the methods used for
 * account recovery features like verifying email, resetting the password,
 * and handling email verification resend attempts.
 */
export interface IAccountRecoveryMiddleware {
  /**
   * Middleware function to validate the verify email token.
   * Checks if the token exists and is not expired for the user.
   * If the token is invalid or expired, an error is thrown.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function to be called.
   *
   * @throws {AppError} - Throws an error if the token is invalid or expired.
   */
  validateVerifyEmails: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Middleware function to validate resend email verification.
   * Checks if the user's email is already verified and if the resend
   * attempts exceed the limit. If attempts exceed, an error is thrown.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function to be called.
   *
   * @throws {AppError} - Throws an error if the email is already verified or
   * if the resend attempts have exceeded the limit.
   */
  validateResendVerificationEmail: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Middleware function to validate the reset password request.
   * Checks if the user exists based on the email provided.
   * If the user exists, it validates the reset password attempts.
   * If the email does not exist, a success message is sent without
   * performing any action.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function to be called.
   */
  validateRequestResetPassword: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Middleware function to validate the reset password process.
   * Validates the reset token and checks if it's expired for the user.
   * Throws an error if the token is invalid or expired.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function to be called.
   *
   * @throws {AppError} - Throws an error if the reset token is invalid or expired.
   */
  validateResetPassword: [
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>,
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>,
  ];
}
