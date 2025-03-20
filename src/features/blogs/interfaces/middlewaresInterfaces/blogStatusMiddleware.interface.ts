// interfaces/index.ts

import { Response, Request, NextFunction } from "express";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

/**
 * Request parameters for blog status operations containing blogId
 */
export interface BlogStatusRequestParams {
  /** The ID of the blog post */
  blogId: string;
}

/**
 * Request body for blog status operations containing the blog post
 */
export interface BlogStatusRequestBody {
  /** The blog post object retrieved from the database */
  blogPost: IBlog;
}

/**
 * Interface for blog status middleware operations
 * Defines methods for validating blog status changes and existence
 * @interface IBlogStatusMiddleware
 */
export interface IBlogStatusMiddleware {
  /**
   * Validates if a blog exists with the given ID and belongs to the requesting user
   * @param req - Express request object containing blog ID in params and user in request
   * @param res - Express response object
   * @param next - Express next function to pass control to next middleware
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next
   * @throws {AppError} If no blog exists with the given ID for the user (404)
   */
  validateBlogExists: (req: Request, res: Response, next: NextFunction) => void;

  /**
   * Validates if a blog can be converted to private status
   * @param req - Express request object containing blogPost in body
   * @param res - Express response object
   * @param next - Express next function to pass control to next middleware
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next
   * @throws {AppError} If blog is already private (400)
   */
  validateConvertToPrivate: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates if a blog can be converted to public status
   * @param req - Express request object containing blogPost in body
   * @param res - Express response object
   * @param next - Express next function to pass control to next middleware
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next
   * @throws {AppError} If blog is already public (400)
   */
  validateConvertToPublic: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates if a blog can be archived
   * @param req - Express request object containing blogPost in body
   * @param res - Express response object
   * @param next - Express next function to pass control to next middleware
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next
   * @throws {AppError} If blog is already archived (400)
   */
  validateArchiveBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates if a blog can be unarchived
   * @param req - Express request object containing blogPost in body
   * @param res - Express response object
   * @param next - Express next function to pass control to next middleware
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next
   * @throws {AppError} If blog is already not archived (400)
   */
  validateUneArchivedBlogPost: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
