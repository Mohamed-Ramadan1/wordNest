import { Request, Response, NextFunction } from "express";

/**
 * Middleware class for handling Reading List CRUD operations validation
 * @class
 */
export interface IReadingListCRUDMiddleware {
  /**
   * Validates the creation of a new reading list item
   *
   * This middleware performs the following checks:
   * 1. Validates the request body against CreateReadingListItemDto
   * 2. Verifies if the specified blog post exists
   * 3. Checks if the blog post is already in the user's reading list
   *
   * @static
   * @memberof IReadingListCRUDMiddleware
   * @type {Array<(
   *   req: Request<{}, {}, CreateReadingListItemRequestBody>,
   *   res: Response,
   *   next: NextFunction
   * ) => void>}
   */
  validateCreateReadingListItem: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}
