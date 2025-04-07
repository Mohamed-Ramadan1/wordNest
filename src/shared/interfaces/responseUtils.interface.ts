import { Response } from "express";

/**
 * Interface for response utility methods.
 */
export interface IResponseUtils {
  /**
   * Sends a JSON response with a given status code.
   *
   * @template T - The type of the response body.
   * @param {number} statusCode - HTTP status code for the response.
   * @param {Response<any, Record<string, any>>} res - Express response object.
   * @param {T} response - The response body.
   * @returns {void}
   */
  sendResponse<T>(statusCode: number, res: Response, response: T): void;
}
