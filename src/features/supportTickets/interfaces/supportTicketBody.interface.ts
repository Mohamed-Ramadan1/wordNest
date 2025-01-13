import { ObjectId } from "mongoose";
import { Attachment, SupportTicketCategory } from "./supportTicket.interface";

export interface SupportTicketBody {
  subject: string;
  description: string;
  category: SupportTicketCategory;
  priority: string;
  attachments?: Attachment;
}

export interface SupportTicketParams {
  ticketId: ObjectId;
}
