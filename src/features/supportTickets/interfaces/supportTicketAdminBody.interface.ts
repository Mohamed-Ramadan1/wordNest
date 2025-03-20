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

export interface TicketPriorityChangeBody {
  priority: SupportTicketPriority;
  ticketToUpdate: ISupportTicket;
  newPriority: SupportTicketPriority;
}

export interface TicketCloseBody {
  ticket: ISupportTicket;
  ticketOwner: IUser;
}

export interface TicketResponseData {
  message: string;
  responderId: ObjectId;
  respondedAt: Date;
  attachment?: Attachment;
  internalNotes?: string;
  escalationLevel?: number;
}

export interface TicketAdminResponseBody {
  ticket: ISupportTicket;
  ticketOwner: IUser;
  message: string;
  internalNotes?: string;
  escalationLevel?: number;
  attachment?: Attachment;
  ticketResponseObject: TicketResponseData;
}

export interface TicketParams {
  ticketId: ObjectId;
}
