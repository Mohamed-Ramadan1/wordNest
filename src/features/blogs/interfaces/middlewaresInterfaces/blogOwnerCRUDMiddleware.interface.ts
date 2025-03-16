// express imports
import { Response, Request, NextFunction } from "express";

/**
 * Interface defining middleware methods for CRUD operations on blog posts by the blog owner.
 * Provides validation methods for creating, deleting, and updating blog posts.
 */
export interface IBlogOwnerCRUDMiddleware {
  /**
   * Validates a create blog post request by ensuring the DTO is valid and preparing blog data.
   * Handles image uploads if present and attaches the prepared blog data to the request body.
   *
   * @property {(req: Request<{}, {}, CreateBlogBodyRequest>, res: Response, next: NextFunction) => void} validateDto - Middleware to validate the request against CreateBlogPostDTO.
   * @property {(req: Request<{}, {}, CreateBlogBodyRequest>, res: Response, next: NextFunction) => Promise<void>} validateCreateBlogPost - Middleware to process and validate blog creation data.
   *
   * @type {Array<((req: Request<{}, {}, CreateBlogBodyRequest>, res: Response, next: NextFunction) => void | Promise<void>)>}
   */
  validateCreateBlogPost: Array<
    (req: Request, res: Response, next: NextFunction) => void | Promise<void>
  >;

  /**
   * Validates a delete blog post request by checking if the blog exists and belongs to the user.
   * Ensures the blog is not already marked for deletion and attaches the blog to the request body.
   *
   * @param {Request<BlogParams, {}, DeleteBlogBodyRequest>} req - The Express request object containing blog ID in params and deletion data in body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves when validation is complete or throws an AppError if validation fails.
   * @throws {AppError} If the blog is not found, doesn't belong to the user, or is already marked for deletion.
   */
  validateDeleteBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates an update blog post request by checking if the blog exists and belongs to the user.
   * Attaches the blog post to the request body if valid.
   *
   * @param {Request<BlogParams, {}, UpdatesBlogBodyRequest>} req - The Express request object containing blog ID in params and update data in body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} Resolves when validation is complete or throws an AppError if validation fails.
   * @throws {AppError} If the blog is not found or doesn't belong to the user.
   */
  validateUpdateBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
