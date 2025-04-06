// packages imports
import { inject, injectable } from "inversify";

//express imports
import { Request } from "express";

// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// packages imports
import { ObjectId } from "mongoose";
import cloudinary from "cloudinary";

// shard imports
import { ICloudinaryUploader, TYPES, IErrorUtils } from "@shared/index";
import { TicketBody } from "@features/supportTickets/interfaces/supportTicketAdminBody.interface";

// logger imports
import { ISupportTicketsLogger } from "@logging/interfaces";

// queues imports
import {
  SupportTicketQueueJobs,
  cloudinaryQueue,
  supportTicketQueue,
  CloudinaryQueueJobs,
} from "@jobs/index";
import { IUser } from "@features/users";

// interfaces imports
import {
  ITicketsCRUDService,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

@injectable()
export class TicketsCRUDService implements ITicketsCRUDService {
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    private readonly supportTicketsLogger: ISupportTicketsLogger,
    @inject(TYPES.SupportTicketManagementRepository)
    private readonly ticketManagementRepository: ISupportTicketManagementRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.CloudinaryUploader)
    private readonly cloudinaryUploader: ICloudinaryUploader
  ) {}
  /**
   * Retrieves all tickets.
   * Fetches a list of all tickets, optionally filtered by certain criteria (e.g., user or status).
   */
  async getAllTickets(req: Request): Promise<ISupportTicket[]> {
    try {
      const supportTickets =
        await this.ticketManagementRepository.getSupportTickets(req);
      return supportTickets;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
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
      const ticket =
        await this.ticketManagementRepository.getSupportTicketById(ticketId);
      return ticket;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
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
          await this.cloudinaryUploader.uploadSingleFile(
            ticketInformation.attachment.imageLink,
            "support-ticket-attachments"
          );

        ticketInformation.attachment.imageLink = uploadedAttachment.secure_url;
        ticketInformation.attachment.imagePublicId =
          uploadedAttachment.public_id;
        ticketInformation.attachment.uploadedAt = new Date();
      }
      const newTicket =
        await this.ticketManagementRepository.createSupportTicket(
          ticketInformation
        );

      this.supportTicketsLogger.logTicketCreation(
        ipAddress,
        ticketInformation.user._id,
        newTicket._id
      );
      supportTicketQueue.add(SupportTicketQueueJobs.SendTicketCreationEmail, {
        supportTicket: newTicket,
        user: ticketInformation.user,
      });
    } catch (err: any) {
      this.supportTicketsLogger.logTicketCreationFail(
        ipAddress,
        ticketInformation.user._id,
        err.message
      );
      this.errorUtils.handleServiceError(err);
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
      await this.ticketManagementRepository.updateSupportTicket(
        ticket,
        updateObject
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
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
      await this.ticketManagementRepository.deleteSupportTicket(ticket);

      this.supportTicketsLogger.logSupportTicketDeletionSuccess(
        ipAddress,
        user._id,
        ticket._id
      );
    } catch (err: any) {
      this.supportTicketsLogger.logSupportTicketDeletionFail(
        ipAddress,
        user._id,
        ticket._id,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }
}
