import { NextFunction, Request, Response } from "express";

/**
 * Interface defining middleware methods for handling support ticket operations
 * @interface ISupportTicketsMiddleware
 */
export interface ISupportTicketsMiddleware {
  /**
   * Validates support ticket creation requests
   * @method validateCreateSupportTicket
   * @param {Request<{}, {}, SupportTicketBody>} req - Express request object with ticket creation data in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error if required fields are missing
   *
   * @description
   * This method:
   * 1. Verifies presence of required fields (subject, description, category)
   * 2. Processes optional file attachment if present
   * 3. Attaches validated attachment to request body
   */
  validateCreateSupportTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates support ticket reply requests
   * @method validateReplaySupportTicket
   * @param {Request<SupportTicketParams, {}, SupportTicketBodyReplay>} req - Express request object with ticket ID in params and reply data in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error if message is missing or ticket not found for user
   *
   * @description
   * This method:
   * 1. Verifies presence of message field
   * 2. Checks if ticket exists and belongs to the requesting user
   * 3. Processes optional file attachment if present
   * 4. Attaches responder ID, timestamp, and ticket to request body
   */
  validateReplaySupportTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
