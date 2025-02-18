import { ObjectId } from "mongoose";
import { BlogCategory, IUploadedImage } from "../interfaces/blog.interface";
import { IUser } from "@features/users";
export interface BlogData {
  title: string;
  content: string;
  author: ObjectId | IUser;
  scheduledFor: Date;
  categories: BlogCategory;
  tags: string[];
  uploadedImages?: IUploadedImage[];
}
export interface CreateScheduleBlogsRequestBody {
  title: string;
  content: string;
  author: ObjectId | IUser;
  categories: BlogCategory;
  tags?: string[];
  scheduledFor: Date;
  uploadedImages: IUploadedImage[];
  blogData: BlogData;
}
export interface ScheduleBlogsParams {
  blogId: ObjectId;
}
