import { Document, ObjectId, VirtualType } from "mongoose";
import { IUser } from "@features/users";
// Support ticket lifecycle states
export enum SupportTicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved", // Added intermediate state
  CLOSED = "closed",
}

export enum SupportTicketCategory {
  TECHNICAL = "technical",
  BILLING = "billing",
  ACCOUNT = "account",
  FEATURE_REQUEST = "feature_request",
  BUG_REPORT = "bug_report",
  OTHER = "other",
}

// Support ticket priority levels
export enum SupportTicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent", // Added for critical issues
}

// Interface for ticket attachments
export interface Attachment {
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: ObjectId | IUser;
}

export interface Response {
  responderId: ObjectId | IUser; // ID of the user or admin who made the response
  message: string; // The message text
  respondedAt: Date; // Timestamp of the response
  attachments: Attachment[]; // Attachments included in the response
}

export interface ISupportTicket extends Document {
  _id: ObjectId;
  user: ObjectId | IUser;
  subject: string;
  description: string;
  attachments: string[];
  category: SupportTicketCategory;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | undefined;
  closedAt: Date | undefined;
  resolvedBy: ObjectId | IUser;
  responses: Response[];
}
