import { IUser } from "@features/users";
import { ObjectId } from "mongoose";
import { IBlog } from "./blog.interface";

export interface BlogManagementRequestBody {
  blogOwner: IUser;
  blogPost: IBlog;
  userAdmin: IUser;
}

export interface BlogsManagementRequestParams {
  userId: ObjectId;
  blogId: ObjectId;
}
