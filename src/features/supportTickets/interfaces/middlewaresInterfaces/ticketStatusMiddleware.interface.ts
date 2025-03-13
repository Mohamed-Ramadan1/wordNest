import { Request, Response, NextFunction } from "express";

/**
 * Interface defining middleware methods for handling support ticket status changes
 * @interface ITicketStatusMiddleware
 */
export interface ITicketStatusMiddleware {
  /**
   * Validates support ticket closure requests
   * @method validateCloseTicket
   * @param {Request<TicketParams, {}, TicketCloseBody>} req - Express request object with ticket ID in params
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error if ticket not found, already closed, or owner doesn't exist
   *
   * @description
   * This method:
   * 1. Verifies ticket existence by ID
   * 2. Checks if ticket is not already closed
   * 3. Confirms ticket owner exists
   * 4. Attaches ticket and owner to request body
   */
  validateCloseTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates support ticket reopening requests
   * @method validateReopenTicket
   * @param {Request<TicketParams, {}, TicketCloseBody>} req - Express request object with ticket ID in params
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error if ticket not found, not closed, or owner doesn't exist
   *
   * @description
   * This method:
   * 1. Verifies ticket existence by ID
   * 2. Checks if ticket is currently closed
   * 3. Confirms ticket owner exists
   * 4. Attaches ticket and owner to request body
   */
  validateReopenTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
