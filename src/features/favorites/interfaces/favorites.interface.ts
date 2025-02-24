import { Document, ObjectId } from "mongoose";
import { IUser } from "@features/users/interfaces/user.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
export interface IFavorite extends Document {
  _id: ObjectId;
  user: IUser | ObjectId;
  blogPost: IBlog | ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
