import { ObjectId } from "mongoose";
import {
  Attachment,
  SupportTicketCategory,
  SupportTicketPriority,
} from "./supportTicket.interface";
import { IUser } from "@features/users";

export interface TicketBody {
  user: IUser;
  userEmail: string;
  subject: string;
  description: string;
  category: SupportTicketCategory;
  priority?: SupportTicketPriority;
  attachment?: Attachment;
}

export interface TicketParams {
  ticketId: ObjectId;
}
