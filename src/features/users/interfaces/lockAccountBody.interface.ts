import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";

export interface LockAccountBody {
  lockReason: string;
  userAccountToBeLocked: IUser;
  userAccountToBeUnLocked: IUser;
  unLockComment: string;
}

export interface LockAccountParameters {
  userId: ObjectId;
}
