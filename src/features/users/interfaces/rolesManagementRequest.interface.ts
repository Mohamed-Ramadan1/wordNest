import { ObjectId } from "mongoose";
import { Roles } from "./index";

export interface RolesManagementRequestBody {
  role: Roles;
}

export interface RolesManagementRequestParams {
  userId: ObjectId;
}
