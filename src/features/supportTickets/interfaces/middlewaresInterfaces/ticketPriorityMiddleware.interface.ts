import { Request, Response, NextFunction } from "express";

/**
 * Interface defining middleware methods for handling support ticket priority changes
 * @interface ITicketPriorityMiddleware
 */
export interface ITicketPriorityMiddleware {
  /**
   * Validates and processes support ticket priority change requests
   * @method validatePriorityChange
   * @param {Request<TicketParams, {}, TicketPriorityChangeBody>} req - Express request object containing ticket ID in params and priority in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error for invalid priority, missing ticket, or duplicate priority
   *
   * @description
   * This method:
   * 1. Checks if priority exists in request body
   * 2. Validates priority against SupportTicketPriority enum
   * 3. Verifies ticket existence by ID
   * 4. Ensures new priority differs from current priority
   * 5. Attaches ticket and new priority to request body
   */
  validatePriorityChange: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
