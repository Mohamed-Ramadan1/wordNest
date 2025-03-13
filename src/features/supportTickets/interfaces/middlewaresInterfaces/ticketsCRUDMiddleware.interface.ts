import { Request, Response, NextFunction } from "express";

/**
 * Interface defining CRUD middleware methods for support ticket management
 * @interface ITicketCRUDMiddleware
 */
export interface ITicketCRUDMiddleware {
  /**
   * Validates support ticket creation requests
   * @method validateCreateTicket
   * @param {Request<{}, {}, TicketBody>} req - Express request object with ticket creation data in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error for missing required fields or non-existent user
   *
   * @description
   * This method:
   * 1. Validates required fields (subject, description, category, userEmail)
   * 2. Verifies user existence by email
   * 3. Processes optional file attachment
   * 4. Sets default priority if not provided
   * 5. Attaches validated user to request body
   */
  validateCreateTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates support ticket deletion requests
   * @method validateDeleteTicket
   * @param {Request<TicketParams, {}, TicketDeletionBody>} req - Express request object with ticket ID in params
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error if ticket not found
   *
   * @description
   * This method:
   * 1. Verifies ticket existence by ID
   * 2. Attaches ticket to be deleted to request body
   */
  validateDeleteTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  /**
   * Validates support ticket update requests
   * @method validateUpdateTicket
   * @param {Request<TicketParams, {}, TicketUPdateBody>} req - Express request object with ticket ID in params and update data in body
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>} Resolves when validation is complete or passes error to next middleware
   * @throws {AppError} Throws error if ticket not found
   *
   * @description
   * This method:
   * 1. Verifies ticket existence by ID
   * 2. Constructs update object with provided fields (category, status, priority)
   * 3. Attaches ticket to be updated and update object to request body
   */
  validateUpdateTicket: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
