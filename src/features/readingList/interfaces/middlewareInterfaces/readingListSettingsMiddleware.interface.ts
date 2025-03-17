import { Request, Response, NextFunction } from "express";

/**
 * Middleware interface for handling Reading List settings operations validation
 * @class
 */
export interface IReadingListSettingsMiddleware {
  /**
   * Validates the alert time format and date for reading list reminders
   *
   * This middleware performs the following checks:
   * 1. Validates the request body against validateAlertTimeFormateDateDto
   * 2. Verifies the date format (DD/MM/YYYY HH:mm)
   * 3. Ensures the scheduled date is in the future
   *
   * @static
   * @memberof IReadingListSettingsMiddleware
   * @type {Array<(
   *   req: Request<{}, {}, validateAlertTimeDateFormatRequestBody>,
   *   res: Response,
   *   next: NextFunction
   * ) => void>}
   */
  validateAlertTimeFormateDate: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;

  /**
   * Creates a reading reminder alert for a reading list item
   *
   * @static
   * @async
   * @memberof IReadingListSettingsMiddleware
   * @type {(
   *   req: Request<ReadingListSettingsRequestParams, {}, ReadingListSettingsRequestBody & validateAlertTimeDateFormatRequestBody>,
   *   res: Response,
   *   next: NextFunction
   * ) => Promise<void>}
   */
  createReadingReminderAlert: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates rescheduling of an existing reminder alert
   *
   * @static
   * @async
   * @memberof IReadingListSettingsMiddleware
   * @type {(
   *   req: Request<ReadingListSettingsRequestParams>,
   *   res: Response,
   *   next: NextFunction
   * ) => void}
   */
  validateReScheduleReminderAlert: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates creation of a new reminder alert
   *
   * @static
   * @async
   * @memberof IReadingListSettingsMiddleware
   * @type {(
   *   req: Request<ReadingListSettingsRequestParams, {}, DeleteReminderAlert>,
   *   res: Response,
   *   next: NextFunction
   * ) => void}
   */
  validateCreateReminderAlert: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates deletion of an existing reminder alert
   *
   * @static
   * @async
   * @memberof IReadingListSettingsMiddleware
   * @type {(
   *   req: Request<ReadingListSettingsRequestParams, {}, DeleteReminderAlert>,
   *   res: Response,
   *   next: NextFunction
   * ) => Promise<void>}
   */
  validateDeleteReminderAlert: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
