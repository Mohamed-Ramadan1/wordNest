import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";

export interface BandAccountsBody {
  banAccountReason: string;
  banAccountDaysNumber: number;
  accountToBeBanned: IUser;
  adminUnbanComment: string;
  accountToBeUnbaned: IUser;
}

export interface BandAccountsParams {
  userId: ObjectId;
}
