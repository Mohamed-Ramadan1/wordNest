import { Request, Response, NextFunction } from "express";

/**
 * Interface for the InteractionsMiddleware class.
 * @interface IInteractionsMiddleware
 */
export interface IInteractionsMiddleware {
  /**
   * Middleware to validate and prepare data for creating an interaction with a blog post.
   * @type {Array<(req: Request<{}, {}, CreateInteractionRequestBody>, res: Response, next: NextFunction) => void>}
   * @description Validates the request body and ensures the blog post exists before creating an interaction.
   */
  validateInteractWithBlogPost: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;

  /**
   * Middleware to validate the request body for updating an interaction.
   * @type {Array<(req: Request<InteractionsRequestParams, {}, UpdateInteractionRequestBody>, res: Response, next: NextFunction) => void>}
   * @description Validates the request body for updating an interaction.
   */
  validateUpdateInteraction: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}
