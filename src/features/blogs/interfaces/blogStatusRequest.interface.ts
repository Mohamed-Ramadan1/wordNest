// contains all body request interfaces for blog owner

import { IUser } from "@features/users";
import { ObjectId } from "mongoose";
import { IBlog } from "./blog.interface";

export interface BlogStatusRequestBody {
  blogPost: IBlog;
}
export interface BlogStatusRequestParams {
  blogId: ObjectId;
}
