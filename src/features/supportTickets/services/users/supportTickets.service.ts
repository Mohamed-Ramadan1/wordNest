// express imports
import { Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// interfaces imports
import {
  SupportTicketBody,
  SupportTicketBodyReplay,
} from "@features/supportTickets/interfaces/supportTicketBody.interface";
import { IUser } from "@features/users";

// packages imports
import cloudinary from "cloudinary";
import { ObjectId } from "mongoose";

// shard imports
import {
  AppError,
  ICloudinaryUploader,
  IErrorUtils,
  TYPES,
} from "@shared/index";

// logging imports
import { ISupportTicketsLogger } from "@logging/interfaces";

// Queues imports
import { supportTicketQueue, SupportTicketQueueJobs } from "@jobs/index";
import {
  ISupportTicket,
  ISupportTicketRepository,
} from "../../interfaces/index";

// interfaces imports
import { ISupportTicketService } from "../../interfaces/index";

@injectable()
export class SupportTicketService implements ISupportTicketService {
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    private readonly supportTicketLogger: ISupportTicketsLogger,
    @inject(TYPES.SupportTicketRepository)
    private readonly supportTicketRepository: ISupportTicketRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.CloudinaryUploader)
    private readonly cloudinaryUploader: ICloudinaryUploader
  ) {}

  /**
   * Creates a new support ticket.
   * Allows the user to submit a new issue or request for assistance.
   */
  async createSupportTicket(
    ticketInfo: SupportTicketBody,
    user: IUser,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      if (ticketInfo.attachments) {
        const uploadedAttachments: cloudinary.UploadApiResponse =
          await this.cloudinaryUploader.uploadSingleFile(
            ticketInfo.attachments.imageLink,
            "support-ticket-attachments"
          );
        // update the attachments with the uploaded imagePublicId.
        ticketInfo.attachments.imagePublicId = uploadedAttachments.public_id;
        ticketInfo.attachments.imageLink = uploadedAttachments.secure_url;
        ticketInfo.attachments.uploadedAt = new Date();
      }

      // Create new support ticket and save it to the database.
      const supportTicket =
        await this.supportTicketRepository.createSupportTicket(
          ticketInfo,
          user._id
        );

      // Add the job to the queue to send an email to the user.
      supportTicketQueue.add(SupportTicketQueueJobs.SendTicketCreationEmail, {
        user,
        supportTicket,
      });

      // Log the successful ticket creation.
      this.supportTicketLogger.logTicketCreation(
        ipAddress,
        user._id,
        supportTicket._id
      );
    } catch (err: any) {
      // Log the error and re-throw it for proper error handling.
      this.supportTicketLogger.logTicketCreationFail(
        ipAddress,
        user._id,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves all support tickets for the current user.
   * Fetches a list of all open or closed tickets submitted by the user.
   */
  async getAllUserSupportTickets(
    user: IUser,
    req: Request
  ): Promise<ISupportTicket[]> {
    try {
      const supportTickets =
        await this.supportTicketRepository.getUserSupportTickets(user._id, req);
      return supportTickets;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves a specific support ticket by ID.
   * Ensures that the ticket belongs to the current user before displaying it.
   */
  async getSupportTicketById(
    user: IUser,
    ticketId: ObjectId
  ): Promise<ISupportTicket> {
    // Implementation here
    try {
      const supportTicket =
        await this.supportTicketRepository.getUserSupportTicket(
          ticketId,
          user._id
        );

      if (!supportTicket) {
        throw new AppError(
          "No support ticket found with this id nad and related to this user.",
          404
        );
      }
      return supportTicket;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Allows the user to reply to a support ticket.
   * Enables the user to add a response or update an existing ticket.
   */
  async replaySupportTicket(
    user: IUser,
    supportTicket: ISupportTicket,
    responseInfo: SupportTicketBodyReplay,
    ipAddress: string | undefined
  ): Promise<void> {
    try {
      if (responseInfo.attachment) {
        const uploadedAttachments: cloudinary.UploadApiResponse =
          await this.cloudinaryUploader.uploadSingleFile(
            responseInfo.attachment.imageLink,
            "support-ticket-replay-attachments"
          );
        // update the attachments with the uploaded imagePublicId.
        responseInfo.attachment.imagePublicId = uploadedAttachments.public_id;
        responseInfo.attachment.imageLink = uploadedAttachments.secure_url;
        responseInfo.attachment.uploadedAt = new Date();
      }

      await this.supportTicketRepository.saveSupportTicketReplay(
        supportTicket,
        responseInfo,
        user._id
      );
      // Add the job to the queue to send an email to the user.
      supportTicketQueue.add(
        SupportTicketQueueJobs.SendUserResponseConfirmationEmail,
        {
          user,
          supportTicket,
        }
      );

      // log success replay ticket
      this.supportTicketLogger.logSuccessReplayTicket(
        ipAddress,
        user._id,
        supportTicket._id,
        responseInfo.message
      );
    } catch (err: any) {
      this.supportTicketLogger.logFailReplayTicket(
        ipAddress,
        user._id,
        supportTicket._id,
        err.message
      );
      this.errorUtils.handleServiceError(err);
    }
  }
}
