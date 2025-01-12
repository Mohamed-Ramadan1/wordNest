import { SupportTicketBody } from "@features/supportTickets/interfaces/supportTicketBody.interface";
import SupportTicket from "@features/supportTickets/models/supportTicket.model";

// interfaces imports
import { IUser } from "@features/users";
import cloudinary from "cloudinary";
// utils imports
import { AppError, uploadToCloudinary } from "@utils/index";

// logging imports
import { supportTicketsLogger } from "@logging/index";

// Queues imports
import { supportTicketQueue, SupportTicketQueueJobs } from "@jobs/index";

export class SupportTicketService {
  /**
   * Creates a new support ticket.
   * Allows the user to submit a new issue or request for assistance.
   */
  static async createSupportTicket(
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
      supportTicketQueue.add(SupportTicketQueueJobs.sendTicketCreationEmail, {
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
  static async getAllUserSupportTickets() {
    // Implementation here
  }

  /**
   * Retrieves a specific support ticket by ID.
   * Ensures that the ticket belongs to the current user before displaying it.
   */
  static async getSupportTicketById() {
    // Implementation here
  }

  /**
   * Allows the user to reply to a support ticket.
   * Enables the user to add a response or update an existing ticket.
   */
  static async replaySupportTicket() {
    // Implementation here
  }
}
