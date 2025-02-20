import { ObjectId } from "mongoose";
export interface BlogsRequestParams {
  userId: ObjectId;
  blogId: ObjectId;
}
