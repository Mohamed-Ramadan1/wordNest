// express imports
import { Response, Request, NextFunction } from "express";

/**
 * Interface defining the middleware logic for validating and adding blog posts to favorites.
 */
export interface IFavoritesMiddleware {
  /**
   * Middleware array to validate and authorize adding a blog post to a user's favorites.
   * Consists of two specific middleware functions:
   * 1. DTO validation using `addFavoriteItemDto`.
   * 2. Custom async validation for blog post existence and favorite duplication.
   * @type {[
   *   (req: Request<{}, {}, FavoriteRequestBody>, res: Response, next: NextFunction) => void,
   *   (req: Request<{}, {}, FavoriteRequestBody>, res: Response, next: NextFunction) => Promise<void>
   * ]}
   * @property {Function} 0 - Validates the request body against `addFavoriteItemDto` schema.
   * @property {Function} 1 - Async middleware performing the following checks:
   *   - Ensures `blogPostId` is provided in the request body.
   *   - Verifies the blog post exists using `BlogModel.findById`.
   *   - Checks if the blog post is already in the user's favorites using `FavoriteModel.findOne`.
   * @param {Request<{}, {}, FavoriteRequestBody>} req - Express request with `blogPostId` in body and authenticated `user`.
   * @param {Response} res - Express response object (unused in this middleware).
   * @param {NextFunction} next - Express next function to proceed or pass errors.
   * @returns {void | Promise<void>} The first middleware returns void; the second returns a Promise.
   * @throws {AppError} Specific errors:
   *   - "Blog post id is required" (400) if `blogPostId` is missing.
   *   - "Blog post you intend to add to your favorites not exist check it and tray again" (404) if blog post is not found.
   *   - "Blog post already in favorites" (400) if the blog post is already favorited by the user.
   */
  validateAddToFavorites: [
    (req: Request, res: Response, next: NextFunction) => void,
    (req: Request, res: Response, next: NextFunction) => Promise<void>,
  ];
}
