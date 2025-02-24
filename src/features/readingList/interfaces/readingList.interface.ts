import { ObjectId, Document } from "mongoose";
import { IUser } from "@features/users";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

export enum ReadingStatus {
  UNREAD = "unread",
  READING = "reading",
  COMPLETED = "completed",
}

export interface IReadingList extends Document {
  _id: ObjectId;
  user: IUser | ObjectId;
  blogPost: IBlog | ObjectId;
  status: ReadingStatus; // Track reading progress
  autoRemove: boolean; // If true, remove after marked as read
  addedAt: Date;
  lastInteractedAt?: Date; // Last time user engaged with the post
  completedAt?: Date; // Timestamp when user finished reading
  reminderAlert?: boolean; // Optional reminder alert flag
  reminderAlertTime?: Date; // Time to send reminder
  notes?: string; // Optional user notes
  createdAt: Date;
  updatedAt: Date;
}
