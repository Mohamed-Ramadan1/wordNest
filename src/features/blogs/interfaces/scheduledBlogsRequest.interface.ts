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
export interface ScheduledBlogData {
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
  blogData: ScheduledBlogData;
}

export interface RescheduleBlogRequestBody {
  rescheduleFormatDate: Date;
  blog: IBlog;
}

export interface UpdateScheduleBlogBodyRequestBody {
  blog: IBlog;
  title?: string;
  content?: string;
  categories?: BlogCategory;
  tags?: string[];
}
export interface ScheduleBlogsParams {
  blogId: ObjectId;
}
