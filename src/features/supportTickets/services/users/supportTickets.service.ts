// interfaces imports
import {
  SupportTicketBody,
  SupportTicketBodyReplay,
} from "@features/supportTickets/interfaces/supportTicketBody.interface";
import { IUser } from "@features/users_feature";

// packages imports
import cloudinary from "cloudinary";
import { ObjectId } from "mongoose";

// utils imports
import { AppError, uploadToCloudinary } from "@utils/index";

// logging imports
import { supportTicketsLogger } from "@logging/index";

// Queues imports
import { supportTicketQueue, SupportTicketQueueJobs } from "@jobs/index";
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// models imports
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

// interfaces imports
import { ISupportTicketService } from "../../interfaces/index";
export class SupportTicketService implements ISupportTicketService {
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
          await uploadToCloudinary(
            ticketInfo.attachments.imageLink,
            "support-ticket-attachments"
          );
        // update the attachments with the uploaded imagePublicId.
        ticketInfo.attachments.imagePublicId = uploadedAttachments.public_id;
        ticketInfo.attachments.imageLink = uploadedAttachments.secure_url;
        ticketInfo.attachments.uploadedAt = new Date();
      }

      // Create new support ticket and save it to the database.
      const supportTicket = await SupportTicket.create({
        ...ticketInfo,
        user: user._id,
      });

      // Add the job to the queue to send an email to the user.
      supportTicketQueue.add(SupportTicketQueueJobs.SendTicketCreationEmail, {
        user,
        supportTicket,
      });

      // Log the successful ticket creation.
      supportTicketsLogger.logTicketCreation(
        ipAddress,
        user._id,
        supportTicket._id
      );
    } catch (err: any) {
      // Log the error and re-throw it for proper error handling.
      supportTicketsLogger.logTicketCreationFail(
        ipAddress,
        user._id,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Retrieves all support tickets for the current user.
   * Fetches a list of all open or closed tickets submitted by the user.
   */
  async getAllUserSupportTickets(user: IUser): Promise<ISupportTicket[]> {
    try {
      const supportTickets: ISupportTicket[] | null = await SupportTicket.find({
        user: user._id,
      });
      return supportTickets;
    } catch (err: any) {
      throw new AppError(err.message, 500);
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
      const supportTicket: ISupportTicket | null = await SupportTicket.findOne({
        _id: ticketId,
        user: user._id,
      });

      console.log(supportTicket);
      if (!supportTicket) {
        throw new AppError(
          "No support ticket found with this id nad and related to this user.",
          404
        );
      }
      return supportTicket;
    } catch (err: any) {
      throw new AppError(err.message, 500);
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
          await uploadToCloudinary(
            responseInfo.attachment.imageLink,
            "support-ticket-replay-attachments"
          );
        // update the attachments with the uploaded imagePublicId.
        responseInfo.attachment.imagePublicId = uploadedAttachments.public_id;
        responseInfo.attachment.imageLink = uploadedAttachments.secure_url;
        responseInfo.attachment.uploadedAt = new Date();
      }

      // Update the support ticket with the new response.
      supportTicket.userResponses.push({
        message: responseInfo.message,
        responderId: user._id,
        respondedAt: new Date(),
        attachment: responseInfo.attachment,
      });
      await supportTicket.save();
      // Add the job to the queue to send an email to the user.
      supportTicketQueue.add(
        SupportTicketQueueJobs.SendUserResponseConfirmationEmail,
        {
          user,
          supportTicket,
        }
      );

      // log success replay ticket
      supportTicketsLogger.logSuccessReplayTicket(
        ipAddress,
        user._id,
        supportTicket._id,
        responseInfo.message
      );
    } catch (err: any) {
      supportTicketsLogger.logFailReplayTicket(
        ipAddress,
        user._id,
        supportTicket._id,
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }
}
