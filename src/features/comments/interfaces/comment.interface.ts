import { Document, ObjectId } from "mongoose";
import { IUser } from "@features/users";
import { IBlog } from "@features/blogs/interfaces";

export interface IComment extends Document {
  _id: ObjectId;
  blog: ObjectId | IBlog; // Reference to the Blog post
  comment_author: IUser | ObjectId;
  content: string;
  attachedImage?: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
