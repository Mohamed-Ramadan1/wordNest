import { ObjectId, Document } from "mongoose";
import { IUser } from "@features/users_feature";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

export enum InteractionType {
  LIKE = "like",
  DISLIKE = "dislike",
  LOVE = "love",
  SUPPORTED = "supported",
  CLAPPING = "clapping",
}

export interface IInteraction extends Document {
  user: IUser | ObjectId; // Who interacted
  blogPost: IBlog | ObjectId; // Blog post being interacted with
  type: InteractionType; // Type of interaction
  interactedAt: Date; // When interaction happened
  createdAt: Date;
  updatedAt: Date;
}
