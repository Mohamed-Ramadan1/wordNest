import { ISupportTicket, Attachment } from "../index";
import { IUser } from "@features/users";
import { ObjectId } from "mongoose";

/**
 * Interface for the TicketResponseService.
 * This service handles admin responses to support tickets.
 */
export interface ITicketResponseService {
  /**
   * Allows an admin to respond to a support ticket.
   *
   * @param ticket - The support ticket being responded to.
   * @param ticketOwner - The owner of the ticket.
   * @param ipAddress - The IP address from which the response is made.
   * @param adminUser - The admin user responding to the ticket.
   * @param ticketResponseObject - Object containing the response details.
   * @param ticketResponseObject.message - The response message from the admin.
   * @param ticketResponseObject.responderId - The ID of the admin responding.
   * @param ticketResponseObject.respondedAt - The timestamp of the response.
   * @param ticketResponseObject.attachment - (Optional) An attachment related to the response.
   * @param ticketResponseObject.internalNotes - (Optional) Internal notes for tracking.
   * @param ticketResponseObject.escalationLevel - (Optional) The escalation level for the response.
   *
   * @throws {AppError} Throws an error if the response fails to be recorded.
   */
  respondToTicket(
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
  ): Promise<void>;
}
