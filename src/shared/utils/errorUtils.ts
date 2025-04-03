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
}
