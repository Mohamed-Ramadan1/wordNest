// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// packages imports
import { ObjectId } from "mongoose";
import cloudinary from "cloudinary";

// models imports
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

// utils imports
import { AppError, uploadToCloudinary } from "@utils/index";
import { TicketBody } from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";

// logger imports
import { supportTicketsLogger } from "@logging/index";

// queues imports
import { SupportTicketQueueJobs, supportTicketQueue } from "@jobs/index";

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
  static async createTicket(
    ticketInformation: TicketBody,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      if (ticketInformation.attachment) {
        const uploadedAttachment: cloudinary.UploadApiResponse =
          await uploadToCloudinary(
            ticketInformation.attachment.imageLink,
            "support-ticket-attachments"
          );

        ticketInformation.attachment.imageLink = uploadedAttachment.secure_url;
        ticketInformation.attachment.imagePublicId =
          uploadedAttachment.public_id;
        ticketInformation.attachment.uploadedAt = new Date();
      }
      const newTicket = await SupportTicket.create({
        ...ticketInformation,
        attachments: ticketInformation.attachment,
      });
      supportTicketsLogger.logTicketCreation(
        ipAddress,
        ticketInformation.user._id,
        newTicket._id
      );
      supportTicketQueue.add(SupportTicketQueueJobs.SendTicketCreationEmail, {
        supportTicket: newTicket,
        user: ticketInformation.user,
      });
    } catch (err: any) {
      supportTicketsLogger.logTicketCreationFail(
        ipAddress,
        ticketInformation.user._id,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }

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
