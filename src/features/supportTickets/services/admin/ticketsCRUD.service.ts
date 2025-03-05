//express imports
import { Request } from "express";

// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// packages imports
import { ObjectId } from "mongoose";
import cloudinary from "cloudinary";

// models imports
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

// utils imports
import { AppError, uploadToCloudinary, APIFeatures } from "@utils/index";
import { TicketBody } from "@features/supportTickets/interfaces/SupportTicketAdminBody.interface";

// logger imports
import { supportTicketsLogger } from "@logging/index";

// queues imports
import {
  SupportTicketQueueJobs,
  cloudinaryQueue,
  supportTicketQueue,
  CloudinaryQueueJobs,
} from "@jobs/index";
import { IUser } from "@features/users_feature";

// interfaces imports
import { ITicketsCRUDService } from "../../interfaces/index";

export class TicketsCRUDService implements ITicketsCRUDService {
  /**
   * Retrieves all tickets.
   * Fetches a list of all tickets, optionally filtered by certain criteria (e.g., user or status).
   */
  async getAllTickets(req: Request): Promise<ISupportTicket[]> {
    try {
      const features = new APIFeatures(SupportTicket.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const allTickets: ISupportTicket[] = await features.execute();
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
  async getTicketById(ticketId: ObjectId): Promise<ISupportTicket> {
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
  async createTicket(
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
  async updateTicket(
    ticket: ISupportTicket,
    updateObject: {
      category?: string;
      status?: string;
      priority?: string;
    }
  ): Promise<void> {
    try {
      const updateFields = Object.fromEntries(
        Object.entries(updateObject).filter(([_, value]) => value !== undefined)
      );
      ticket.set(updateFields);
      await ticket.save();
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Deletes a specific ticket by ID.
   * Removes the ticket from the database.
   *
   * @param ticketId - The unique ID of the ticket to delete.
   */
  public async deleteTicket(
    ticket: ISupportTicket,
    user: IUser,
    ipAddress?: string
  ): Promise<void> {
    try {
      if (ticket.attachments) {
        await cloudinaryQueue.add(CloudinaryQueueJobs.DeleteImage, {
          publicId: ticket.attachments.imagePublicId,
          userId: user._id,
        });
      }
      await SupportTicket.deleteOne({ _id: ticket._id });

      supportTicketsLogger.logSupportTicketDeletionSuccess(
        ipAddress,
        user._id,
        ticket._id
      );
    } catch (err: any) {
      supportTicketsLogger.logSupportTicketDeletionFail(
        ipAddress,
        user._id,
        ticket._id,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }
}
