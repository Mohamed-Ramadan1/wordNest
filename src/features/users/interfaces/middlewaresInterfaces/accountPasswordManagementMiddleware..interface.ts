import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "@features/users/dtos/changePassword.dto";
import { IUser } from "../user.interface";

/**
 * Middleware class for handling account password change validation
 */
export interface IAccountPasswordManagementMiddleware {
  /**
   * Validates the request to change account password
   * Array of middleware functions that:
   * 1. Validates ChangePasswordDTO
   * 2. Verifies current password
   * @param req - Express request object containing authenticated user and password details in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If DTO validation fails or current password is incorrect
   */
  validateChangeAccountPassword: Array<
    (
      req: Request<{}, {}, ChangePasswordDTO & { currentPassword: string }> & {
        user?: Pick<IUser, "_id">;
      },
      res: Response,
      next: NextFunction
    ) => void
  >;
}
