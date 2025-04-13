import { IBlog } from "@features/blogs/interfaces";
import { IUser } from "@features/users";
import { Document, ObjectId } from "mongoose";

// Enum for report status
export enum ContentReportingStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

// Enum for report type
export enum ContentReportingType {
  SPAM = "spam",
  HARASSMENT = "harassment",
  HATE_SPEECH = "hate_speech",
  FRAUD = "fraud",
  COPYRIGHT_VIOLATION = "copyright_violation",
  NSFW_CONTENT = "nsfw_content",
  OTHER = "other",
}

// Enum for resolution type
export enum ResolutionType {
  CONTENT_REMOVED = "content_removed",
  USER_WARNED = "user_warned",
  NO_ACTION = "no_action",
  OTHER = "other",
}
// Updated interface for content reporting
export interface IContentReporting extends Document {
  _id: ObjectId;
  user: ObjectId | IUser; // User who submitted the report
  content: ObjectId | IBlog; // Blog content being reported
  type: ContentReportingType; // Type of issue being reported
  status: ContentReportingStatus; // Current status of the report
  details: string; // Details of the report (combines reason/description)
  processedBy?: ObjectId | IUser; // User who processed the report (optional)
  processedAt?: Date; // When the report was processed (optional)
  processedNotes?: string; // Notes from the processor (optional)
  resolutionType?: ResolutionType; // How the report was resolved (optional)
  isArchived?: boolean; // Soft-delete flag (optional, defaults to false)
  createdAt: Date; // Auto-generated timestamp
  updatedAt: Date; // Auto-generated timestamp
}
