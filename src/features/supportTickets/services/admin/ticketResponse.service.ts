// packages imports
import { inject, injectable } from "inversify";
// interfaces imports
import { ISupportTicket } from "@features/supportTickets/interfaces/supportTicket.interface";

// shard imports
import { uploadToCloudinary, TYPES, IErrorUtils } from "@shared/index";

// logger imports
// logger imports
import { ISupportTicketsLogger } from "@logging/interfaces";

import { IUser } from "@features/users";

import cloudinary from "cloudinary";
// queues imports
import { SupportTicketQueueJobs, supportTicketQueue } from "@jobs/index";

// interfaces imports
import {
  ITicketResponseService,
  TicketResponseData,
  ISupportTicketManagementRepository,
} from "../../interfaces/index";

@injectable()
export class TicketResponseService implements ITicketResponseService {
  constructor(
    @inject(TYPES.SupportTicketsLogger)
    private readonly supportTicketsLogger: ISupportTicketsLogger,
    @inject(TYPES.SupportTicketManagementRepository)
    private readonly ticketManagementRepository: ISupportTicketManagementRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Allows an admin to respond to a ticket.
   * Admins can provide a reply to address user concerns or issues in a ticket.
   */
  async respondToTicket(
    ticket: ISupportTicket,
    ticketOwner: IUser,
    ipAddress: string | undefined,
    adminUser: IUser,
    ticketResponseObject: TicketResponseData
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
      await this.ticketManagementRepository.saveAdminTicketResponse(
        ticket,
        ticketResponseObject
      );
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
      this.errorUtils.handleServiceError(err);
    }
  }
}
