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
  imageLink: string;
  imagePublicId: string;
  uploadedAt: Date;
}
// Base response interface
export interface Response {
  responderId: ObjectId | IUser; // ID of the user or admin who made the response
  message: string; // The message text
  respondedAt: Date; // Timestamp of the response
  attachment?: Attachment; // Attachments included in the response
}

// Interface for user responses
export interface UserResponse extends Response {
  isFollowUp?: boolean; // Indicates if this is a follow-up response
}

// Interface for admin responses
export interface AdminResponse extends Response {
  internalNotes?: string; // Internal notes for admins
  escalationLevel?: number; // Escalation level (e.g., 1 for normal, 2 for escalated)
}

export interface ISupportTicket extends Document {
  _id: ObjectId;
  user: ObjectId | IUser;
  subject: string;
  description: string;
  attachments?: Attachment;
  category: SupportTicketCategory;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | undefined;

  closedAt: Date | undefined;
  resolvedBy: ObjectId | IUser;
  reopenedAt: Date | undefined;
  reopenedBy: ObjectId | IUser;
  userResponses: UserResponse[];
  adminResponses: AdminResponse[];
}
