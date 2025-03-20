import { NextFunction, Request, Response } from "express";

/**
 * Middleware class for handling account notification settings validation
 */
export interface IAccountNotificationMiddleware {
  /**
   * Validates the request to enable account notifications
   * @param req - Express request object containing authenticated user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If user is not authenticated or notifications are already enabled
   */
  validateEnableAccountNotifications: (
    req: Request & { user?: { notificationsEnabled: boolean } },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the request to disable account notifications
   * @param req - Express request object containing authenticated user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If user is not authenticated or notifications are already disabled
   */
  validateDisableAccountNotifications: (
    req: Request & { user?: { notificationsEnabled: boolean } },
    res: Response,
    next: NextFunction
  ) => void;
}
