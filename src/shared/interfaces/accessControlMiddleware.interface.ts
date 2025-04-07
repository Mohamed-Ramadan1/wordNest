// interfaces imports (add this to your existing imports if in a separate file)
import { Request, Response, NextFunction } from "express";

/**
 * Interface for the AccessControlMiddleware class.
 * Defines the methods for protecting routes and restricting access based on roles.
 */
export interface IAccessControlMiddleware {
  /**
   * Middleware to protect routes by validating JWT tokens and user account status.
   * Attaches the authenticated user to the request object if successful.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} - Resolves when the middleware completes or passes an error to next().
   */
  protect: (req: Request, res: Response, next: NextFunction) => void;

  /**
   * Middleware factory to restrict access to specific user roles.
   * @param roles - A variadic list of role strings that are allowed to access the route.
   * @returns {(req: Request, res: Response, next: NextFunction) => void} - A middleware function that checks user roles.
   */
  restrictTo: (
    ...roles: string[]
  ) => (req: Request, res: Response, next: NextFunction) => void;
}
