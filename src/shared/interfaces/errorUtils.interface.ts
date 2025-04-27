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

  /**
   * Handles repository errors by throwing a generic error with the provided message.
   * @param errMessage - The error message to include in the thrown error.
   * @throws {Error} - Throws a generic Error with the specified message.
   */
  handleRepositoryError(errMessage: string): never;

  /**
   * Handles application errors by throwing an AppError with the provided message and status code.
   * @param errMessage - The error message to include in the thrown AppError.
   * @param statusCode - The HTTP status code to associate with the AppError.
   * @throws {AppError} - Throws an instance of AppError with the specified message and status code.
   */
  handleAppError(errMessage: string, statusCode: number): never;
}
