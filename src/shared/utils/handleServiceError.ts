// utils/errorHandler.ts
import { AppError } from "@shared/index";

/**
 * Handles errors in services by throwing an appropriate AppError.
 * @param error - The error object to process.
 */
export function handleServiceError(error: any): never {
  if (error instanceof AppError) throw error;
  const errorMessage =
    error && error.message ? error.message : "An unexpected error occurred";
  throw new AppError(errorMessage, 500);
}
