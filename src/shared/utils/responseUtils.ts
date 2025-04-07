import { Response } from "express";
import { IResponseUtils } from "../interfaces/index";

/**
 * Utility class for handling API responses.
 */
export class ResponseUtils implements IResponseUtils {
  /**
   * Sends a JSON response with a specified status code.
   *
   * @template T - The type of the response body.
   * @param {number} statusCode - HTTP status code.
   * @param {Response<any, Record<string, any>>} res - Express response object.
   * @param {T} response - The response body.
   */
  public sendResponse<T>(statusCode: number, res: Response, response: T): void {
    res.status(statusCode).json(response);
  }
}
