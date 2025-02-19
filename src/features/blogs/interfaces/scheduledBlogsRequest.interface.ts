import { ObjectId } from "mongoose";
import {
  BlogCategory,
  IBlog,
  IUploadedImage,
} from "../interfaces/blog.interface";
import { IUser } from "@features/users";

export interface validateScheduleDateFormatRequestBody {
  scheduledFor: string;
  parsedDate: Date;
}
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
  scheduledFor: string;
  uploadedImages: IUploadedImage[];
  blogData: BlogData;
}

export interface RescheduleBlogRequestBody {
  rescheduleFormatDate: Date;
  blog: IBlog;
}
export interface ScheduleBlogsParams {
  blogId: ObjectId;
}
