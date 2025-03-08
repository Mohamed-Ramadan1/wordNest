// packages imports
import { inject, injectable } from "inversify";
// interfaces imports
import {
  ISupportTicket,
  SupportTicketStatus,
} from "@features/supportTickets/interfaces/supportTicket.interface";

// shard imports
import { uploadToCloudinary, TYPES, handleServiceError } from "@shared/index";

// logger imports
// logger imports
import { ISupportTicketsLogger } from "@logging/interfaces";

import { IUser } from "@features/users";

import { ObjectId } from "mongoose";
import { Attachment } from "@features/supportTickets/interfaces/supportTicket.interface";

import cloudinary from "cloudinary";
// queues imports
import { SupportTicketQueueJobs, supportTicketQueue } from "@jobs/index";

// interfaces imports
import { ITicketResponseService } from "../../interfaces/index";

@injectable()
export class TicketResponseService implements ITicketResponseService {
  private supportTicketsLogger: ISupportTicketsLogger;
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    supportTicketsLogger: ISupportTicketsLogger
  ) {
    this.supportTicketsLogger = supportTicketsLogger;
  }
  /**
   * Allows an admin to respond to a ticket.
   * Admins can provide a reply to address user concerns or issues in a ticket.
   */
  async respondToTicket(
    ticket: ISupportTicket,
    ticketOwner: IUser,
    ipAddress: string | undefined,
    adminUser: IUser,
    ticketResponseObject: {
      message: string;
      responderId: ObjectId;
      respondedAt: Date;
      attachment?: Attachment;
      internalNotes?: string;
      escalationLevel?: number;
    }
  ): Promise<void> {
    try {
      if (ticketResponseObject.attachment) {
        const uploadedAttachments: cloudinary.UploadApiResponse =
          await uploadToCloudinary(
            ticketResponseObject.attachment.imageLink,
            "support-ticket-attachments"
          );
        // update the attachments with the uploaded imagePublicId.
        ticketResponseObject.attachment.imagePublicId =
          uploadedAttachments.public_id;
        ticketResponseObject.attachment.imageLink =
          uploadedAttachments.secure_url;
        ticketResponseObject.attachment.uploadedAt = new Date();
      }
      ticket.adminResponses.push(ticketResponseObject);
      ticket.status = SupportTicketStatus.IN_PROGRESS;
      await ticket.save();
      // log response event
      this.supportTicketsLogger.logSuccessAdminResponseTicket(
        ipAddress,
        adminUser._id,
        ticket._id,
        ticketResponseObject.message
      );

      // send response to user vi queue
      supportTicketQueue.add(SupportTicketQueueJobs.SendAdminResponseEmail, {
        user: ticketOwner,
        supportTicket: ticket,
      });
    } catch (err: any) {
      this.supportTicketsLogger.logFailAdminResponseTicket(
        ipAddress,
        adminUser._id,
        ticket._id,
        err
      );
      handleServiceError(err);
    }
  }
}
