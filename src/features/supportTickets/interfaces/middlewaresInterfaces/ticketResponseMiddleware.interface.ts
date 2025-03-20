import { NextFunction, Request, Response } from "express";

/**
 * Interface defining middleware methods for handling support ticket responses
 * @interface ITicketResponseMiddleware
 */
export interface ITicketResponseMiddleware {
  /**
   * Validates and processes support ticket response requests
   * @method validateRespondToTicket
   * @param {Request<TicketParams, {}, TicketAdminResponseBody>} req - Express request object containing ticket ID in params and response data in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error for missing message, non-existent ticket, or non-existent ticket owner
   *
   * @description
   * This method:
   * 1. Verifies message presence in request body
   * 2. Validates ticket existence by ID
   * 3. Confirms ticket owner exists
   * 4. Processes optional file attachment
   * 5. Constructs ticket response object with message, responder ID, timestamp, and optional escalation/notes
   * 6. Attaches validated data to request body
   */
  validateRespondToTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
