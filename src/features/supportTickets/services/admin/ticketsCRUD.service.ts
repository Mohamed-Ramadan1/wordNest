// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// packages imports
import { ObjectId } from "mongoose";

// models imports
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

// utils imports
import { AppError } from "@utils/index";

export class TicketsCRUDService {
  /**
   * Retrieves all tickets.
   * Fetches a list of all tickets, optionally filtered by certain criteria (e.g., user or status).
   */
  static async getAllTickets(): Promise<ISupportTicket[]> {
    try {
      const allTickets: ISupportTicket[] = await SupportTicket.find();
      return allTickets;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Retrieves a specific ticket by ID.
   * Ensures the ticket exists and retrieves it from the database.
   *
   * @param ticketId - The unique ID of the ticket to retrieve.
   */
  static async getTicketById(ticketId: ObjectId): Promise<ISupportTicket> {
    try {
      const ticket: ISupportTicket | null =
        await SupportTicket.findById(ticketId);
      if (!ticket) {
        throw new AppError(
          `No support ticket found with this id:${ticketId} `,
          404
        );
      }
      return ticket;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Creates a new ticket.
   * Saves the new ticket data to the database and triggers necessary actions.
   *
   * @param ticketData - The data for the new ticket, including issue details and other relevant information.
   */
  static createTicket() {}

  /**
   * Updates a specific ticket by ID.
   * Modifies the details of an existing ticket in the database.
   *
   * @param ticketId - The unique ID of the ticket to update.
   * @param updateData - The data to update the ticket with, including modified details.
   */
  static updateTicketById() {}

  /**
   * Deletes a specific ticket by ID.
   * Removes the ticket from the database.
   *
   * @param ticketId - The unique ID of the ticket to delete.
   */
  static deleteTicketById() {}
}
