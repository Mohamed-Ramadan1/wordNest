import { NextFunction, Request, Response } from "express";
import { IUser } from "@features/users";

/**
 * Interface representing middleware functions for authentication operations
 * including user registration and login processes.
 */
export interface IAuthMiddleware {
  /**
   * Combined middleware array for user registration validation
   * Validates registration DTO and checks for email uniqueness
   */
  validateRegistration: Array<
    | ((
        req: Request,
        res: Response,
        next: NextFunction
      ) => void | Promise<void>)
    | ((req: Request, res: Response, next: NextFunction) => Promise<void>)
  >;

  /**
   * Combined middleware array for user login validation
   * Validates login DTO and performs comprehensive authentication checks
   */
  validateLogin: Array<
    | ((
        req: Request,
        res: Response,
        next: NextFunction
      ) => void | Promise<void>)
    | ((
        req: Request & { user?: IUser },
        res: Response,
        next: NextFunction
      ) => Promise<void>)
  >;
}
