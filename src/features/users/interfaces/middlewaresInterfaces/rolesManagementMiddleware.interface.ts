import { NextFunction, Request, Response } from "express";
import { IUser } from "../user.interface";

/**
 * Middleware class for handling user role management validation
 */
export interface IRolesManagementMiddleware {
  /**
   * Validates the request parameters for role management operations
   * @param req - Express request object containing userId in params and role in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If validation fails or user cannot be found
   */
  validateRequestParams: (
    req: Request & { userToBeAssigned?: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the request before adding a role to a user
   * @param req - Express request object containing role in body and targeted user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If role is already assigned to the user
   */
  validateAddRoleToUser: (
    req: Request & { userToBeAssigned: IUser },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the request before removing a role from a user
   * @param req - Express request object containing role in body and targeted user
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If role is not assigned to the user
   */
  validateRemoveRoleFromUser: (
    req: Request & { userToBeAssigned: IUser },
    res: Response,
    next: NextFunction
  ) => void;
}
