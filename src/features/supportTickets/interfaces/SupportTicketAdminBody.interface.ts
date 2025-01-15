import { ObjectId } from "mongoose";
import {
  Attachment,
  ISupportTicket,
  SupportTicketCategory,
  SupportTicketPriority,
  SupportTicketStatus,
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

export interface TicketDeletionBody {
  ticketToBeDeleted: ISupportTicket;
}

export interface TicketUPdateBody {
  ticketToUpdate: ISupportTicket;
  category: SupportTicketCategory;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  updateTicketObject: {
    category?: SupportTicketCategory;
    status?: SupportTicketStatus;
    priority?: SupportTicketPriority;
  };
}

export interface TicketParams {
  ticketId: ObjectId;
}
