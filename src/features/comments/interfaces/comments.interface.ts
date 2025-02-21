import { Document, ObjectId } from "mongoose";
import { IUser } from "@features/users";

export interface IComment extends Document {
  _id: ObjectId;
  blog: ObjectId; // Reference to the Blog post
  author: IUser | ObjectId;
  content: string;
  parentComment?: ObjectId; // For replies (optional)
  replies: ObjectId[]; // Array of reply comment IDs
  likesCount: number;
  dislikesCount: number;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
