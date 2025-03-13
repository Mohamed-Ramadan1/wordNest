import { NextFunction, Request, Response } from "express";
import { IFieldsToBeUpdates } from "../fieldsToBeUpdate.interface";

/**
 * Middleware class for handling user profile updates validation
 */
export interface IProfileMiddleware {
  /**
   * Validates the request to update user profile picture
   * @param req - Express request object containing file upload
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If no image is provided, wrong file type, or size exceeds 2MB
   */
  validateUpdateUserProfilePicture: (
    req: Request & { file?: { mimetype: string; size: number; path: string } },
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates the request to update user profile information
   * @param req - Express request object containing profile information in body
   * @param res - Express response object
   * @param next - Express next function
   * @throws {AppError} If validation fails for required fields, length constraints, or password inclusion
   */
  validateUpdateUserProfileInformation: (
    req: Request<
      {},
      {},
      {
        firstName?: string;
        lastName?: string;
        bio?: string;
        password?: string;
        confirmPassword?: string;
      }
    > & { profileInformationToUpdate?: IFieldsToBeUpdates },
    res: Response,
    next: NextFunction
  ) => void;
}
