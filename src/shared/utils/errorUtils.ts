/**
 * Utility class for handling errors in services.
 * Implements IErrorUtils to ensure consistency in error handling.
 */
import { AppError } from "./appError";
import { IErrorUtils } from "../interfaces/index";

export class ErrorUtils implements IErrorUtils {
  /**
   * Handles service errors and throws a formatted application error.
   * @param error - The error object to handle.
   * @throws {AppError} - Throws an instance of AppError with a formatted message.
   */
  public handleServiceError(error: any): never {
    if (error instanceof AppError) throw error;
    const errorMessage =
      error && error.message ? error.message : "An unexpected error occurred";
    throw new AppError(errorMessage, 500);
  }

  /**
   * Handles repository errors by throwing a generic error with the provided message.
   * @param errMessage - The error message to include in the thrown error.
   * @throws {Error} - Throws a generic Error with the specified message.
   */
  public handleRepositoryError(errMessage: string): never {
    throw new Error(errMessage);
  }

  /**
   * Handles application errors by throwing an AppError with the provided message and status code.
   * @param errMessage - The error message to include in the thrown AppError.
   * @param statusCode - The HTTP status code to associate with the AppError.
   * @throws {AppError} - Throws an instance of AppError with the specified message and status code.
   */
  public handleAppError(errMessage: string, statusCode: number): never {
    throw new AppError(errMessage, statusCode);
  }
}
