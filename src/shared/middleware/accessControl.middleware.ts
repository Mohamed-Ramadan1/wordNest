// express imports
import { Request, Response, NextFunction } from "express";

// package imports
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, TYPES } from "@shared/index";

// interfaces imports
import {
  IAccessControlMiddleware,
  IAccessControlMiddlewareHelpers,
} from "../interfaces/index";

// Shard imports
import { AppError } from "@shared/index";

// interfaces imports
import { Roles } from "@features/users/interfaces/user.interface";

/**
 * Middleware class for handling route protection and role-based access control.
 * Implements authentication and authorization logic for Express routes.
 * @implements {IAccessControlMiddleware}
 */

@injectable()
export class AccessControlMiddleware implements IAccessControlMiddleware {
  constructor(
    @inject(TYPES.AccessControlMiddlewareHelpers)
    private readonly accessControllerMiddlewareHelpers: IAccessControlMiddlewareHelpers
  ) {}
  /**
   * Protects routes by validating JWT tokens and user account status.
   * Attaches the authenticated user to the request object if successful.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The Express next function to pass control to the next middleware.
   * @returns {Promise<void>} - Resolves when the middleware completes or passes an error to next().
   */
  public protect = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const token: string =
        this.accessControllerMiddlewareHelpers.validateHeaderTokenExists(req);

      const decoded: JwtPayload =
        this.accessControllerMiddlewareHelpers.verifyJWTValidity(token);

      const user = await this.accessControllerMiddlewareHelpers.checkUserExists(
        decoded.id
      );

      this.accessControllerMiddlewareHelpers.validateUserAccountStatus(user);

      req.user = user;
      next();
    }
  );

  /**
   * Restricts route access to users with specific roles.
   * @param roles - A variadic list of role strings that are allowed to access the route.
   * @returns {(req: Request, res: Response, next: NextFunction) => void} - A middleware function that checks user roles.
   */
  public restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      // Ensure user and roles are defined
      if (!req.user || !Array.isArray(req.user.roles)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }

      // Check if the user has at least one of the required roles
      const userHasRole = req.user.roles.some((role: Roles) =>
        roles.includes(role)
      );

      if (!userHasRole) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }

      next();
    };
  };
}
