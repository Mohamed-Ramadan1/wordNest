// express imports
import { Response, Request, NextFunction } from "express";

/**
 * Interface defining middleware methods for managing blog operations.
 * Provides validation methods for blog post management requests,
 * publishing status, and unpublishing status.
 */
export interface IBlogsManagementMiddleware {
  /**
   * Validates a blog post management request by checking if the blog and its author exist.
   * Attaches the blog owner, blog post, and admin user to the request body if valid.
   *
   * @param {Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>} req - The Express request object containing blog ID in params and management data in body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves when validation is complete or throws an AppError if validation fails.
   * @throws {AppError} If the blog or its author is not found.
   */
  validateBlogPostManagementRequest: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates that a blog post is not already unpublished before proceeding with an unpublish operation.
   *
   * @param {Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>} req - The Express request object containing the blog post in the body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves if the blog is published or throws an AppError if already unpublished.
   * @throws {AppError} If the blog post is already unpublished.
   */
  validateUnPublishBlogStatus: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates that a blog post is not already published before proceeding with a publish operation.
   *
   * @param {Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>} req - The Express request object containing the blog post in the body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves if the blog is unpublished or throws an AppError if already published.
   * @throws {AppError} If the blog post is already published.
   */
  validatePublishBlogStatus: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
