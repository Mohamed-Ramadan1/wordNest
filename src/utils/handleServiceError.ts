// utils/errorHandler.ts
import { AppError } from "@utils/index";

/**
 * Handles errors in services by throwing an appropriate AppError.
 * @param error - The error object to process.
 */
export function handleServiceError(error: any): never {
  if (error instanceof AppError) throw error;
  throw new AppError(error.message || "An unexpected error occurred", 500);
}
