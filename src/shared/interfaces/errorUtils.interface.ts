/**
 * Interface for error handling utility class.
 */
export interface IErrorUtils {
  /**
   * Handles service errors and throws a formatted application error.
   * @param error - The error object to handle.
   * @throws {AppError} - Throws an instance of AppError with a formatted message.
   */
  handleServiceError(error: any): never;
}
