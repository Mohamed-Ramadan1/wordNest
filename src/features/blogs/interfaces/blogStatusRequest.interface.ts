// contains all body request interfaces for blog owner
import { ObjectId } from "mongoose";
import { IBlog } from "./blog.interface";

export interface BlogStatusRequestBody {
  blogPost: IBlog;
}
export interface BlogStatusRequestParams {
  blogId: ObjectId;
}
