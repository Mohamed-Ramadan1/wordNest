// contains all body request interfaces for blog owner

import { IUser } from "@features/users_feature";
import { ObjectId } from "mongoose";
import { BlogCategory, IBlog, IUploadedImage } from "./blog.interface";

export interface BlogData {
  title: string;
  content: string;
  author: ObjectId | IUser;
  categories: BlogCategory;
  tags: string[];
  uploadedImages?: IUploadedImage[];
}

export interface CreateBlogBodyRequest {
  title: string;
  content: string;
  categories: BlogCategory;
  tags: string[];
  blogImages: IUploadedImage[];
  blogData: BlogData;
}

export interface UpdatesBlogBodyRequest {
  blogPost: IBlog;
  title?: string;
  content?: string;
  categories?: BlogCategory;
  tags?: string[];
}

export interface DeleteBlogBodyRequest {
  blogToBeDeleted: IBlog;
}

export interface BlogParams {
  blogId: ObjectId;
}
