import { Request } from "express";
import { ISupportTicket, TicketBody } from "../index";
import { ObjectId } from "mongoose";
import { IUser } from "@features/users";

/**
 * Interface for TicketsCRUDService, defining ticket management operations.
 */
export interface ITicketsCRUDService {
  /**
   * Retrieves all support tickets with optional filtering, sorting, and pagination.
   *
   * @param req - Express request containing query parameters for filtering.
   * @returns Promise resolving to an array of support tickets.
   * @throws {AppError} If retrieval fails.
   */
  getAllTickets(req: Request): Promise<ISupportTicket[]>;

  /**
   * Retrieves a specific support ticket by its ID.
   *
   * @param ticketId - The unique ID of the ticket to retrieve.
   * @returns Promise resolving to the retrieved support ticket.
   * @throws {AppError} If the ticket is not found.
   */
  getTicketById(ticketId: ObjectId): Promise<ISupportTicket>;

  /**
   * Creates a new support ticket.
   *
   * @param ticketInformation - Data for the new ticket, including issue details.
   * @param ipAddress - The IP address from which the ticket is created.
   * @throws {AppError} If ticket creation fails.
   */
  createTicket(
    ticketInformation: TicketBody,
    ipAddress?: string
  ): Promise<void>;

  /**
   * Updates details of an existing ticket.
   *
   * @param ticket - The support ticket to update.
   * @param updateObject - The data to update, such as category, status, or priority.
   * @throws {AppError} If updating the ticket fails.
   */
  updateTicket(
    ticket: ISupportTicket,
    updateObject: {
      category?: string;
      status?: string;
      priority?: string;
    }
  ): Promise<void>;

  /**
   * Deletes a support ticket.
   *
   * @param ticket - The support ticket to delete.
   * @param ipAddress - The IP address from which the request is made.
   * @param user - The user requesting the deletion.
   * @throws {AppError} If ticket deletion fails.
   */
  deleteTicket(
    ticket: ISupportTicket,
    user: IUser,
    ipAddress?: string
  ): Promise<void>;
}
