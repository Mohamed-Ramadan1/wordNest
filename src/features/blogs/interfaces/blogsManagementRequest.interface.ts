import { IUser } from "@features/users";
import { ObjectId } from "mongoose";
import { IBlog } from "./blog.interface";

export interface BlogsManagementRequestParams {
  userId: ObjectId;
  blogId: ObjectId;
}
