import { ObjectId } from "mongoose";
import {
  Attachment,
  ISupportTicket,
  SupportTicketCategory,
} from "./supportTicket.interface";

export interface SupportTicketBody {
  subject: string;
  description: string;
  category: SupportTicketCategory;
  priority: string;
  attachments?: Attachment;
}

export interface SupportTicketBodyReplay {
  message: string;
  responderId: ObjectId;
  respondedAt: Date;
  attachment?: Attachment;
  supportTicket: ISupportTicket;
}

export interface SupportTicketParams {
  ticketId: ObjectId;
}
