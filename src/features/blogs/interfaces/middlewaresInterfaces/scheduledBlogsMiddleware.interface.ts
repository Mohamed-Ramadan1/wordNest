// express imports
import { Response, Request, NextFunction } from "express";

/**
 * Interface defining middleware methods for managing scheduled blog post operations.
 * Provides validation methods for scheduling dates, creating, rescheduling, and updating scheduled blog posts.
 */
export interface IScheduledBlogsMiddleware {
  /**
   * Validates the format and logic of a scheduled date for a blog post.
   * Ensures the date is provided, in the correct format (DD/MM/YYYY HH:mm), valid, and in the future.
   * Attaches the parsed date to the request body.
   *
   * @param {Request<{}, {}, validateScheduleDateFormatRequestBody>} req - The Express request object containing the scheduled date in the body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves when validation is complete or throws an AppError if validation fails.
   * @throws {AppError} If the scheduled date is missing, invalid, or in the past.
   */
  validateScheduleDateFormat: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates a create scheduled blog post request by ensuring the DTO is valid and preparing blog data.
   * Handles image uploads if present and attaches the prepared blog data, including the scheduled date, to the request body.
   *
   * @property {(req: Request<{}, {}, CreateScheduleBlogsRequestBody & validateScheduleDateFormatRequestBody>, res: Response, next: NextFunction) => void} validateDto - Middleware to validate the request against CreateBlogPostDTO.
   * @property {(req: Request<{}, {}, CreateScheduleBlogsRequestBody & validateScheduleDateFormatRequestBody>, res: Response, next: NextFunction) => Promise<void>} validateCreateScheduledBlogPost - Middleware to process and validate scheduled blog creation data.
   *
   * @type {Array<((req: Request<{}, {}, CreateScheduleBlogsRequestBody & validateScheduleDateFormatRequestBody>, res: Response, next: NextFunction) => void | Promise<void>)>}
   */
  validateCreateScheduledBlogPost: Array<
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>
  >;

  /**
   * Validates a reschedule blog post request by checking if the blog exists, belongs to the user, and is scheduled.
   * Attaches the blog post and the parsed reschedule date to the request body if valid.
   *
   * @param {Request<ScheduleBlogsParams, {}, RescheduleBlogRequestBody & validateScheduleDateFormatRequestBody>} req - The Express request object containing blog ID in params and reschedule data in body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves when validation is complete or throws an AppError if validation fails.
   * @throws {AppError} If the blog is not found, doesn't belong to the user, or is not scheduled.
   */
  validateRescheduleBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates an update scheduled blog post request by checking if the blog exists, belongs to the user, and is scheduled.
   * Attaches the blog post to the request body if valid.
   *
   * @param {Request<ScheduleBlogsParams, {}, UpdateScheduleBlogBodyRequestBody>} req - The Express request object containing blog ID in params and update data in body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves when validation is complete or throws an AppError if validation fails.
   * @throws {AppError} If the blog is not found, doesn't belong to the user, or is not scheduled.
   */
  validateUpdateScheduledBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
