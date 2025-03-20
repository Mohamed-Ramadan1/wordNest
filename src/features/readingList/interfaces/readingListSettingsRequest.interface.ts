import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";
import { ObjectId } from "mongoose";
import { IReadingList } from "./index";

export interface ReminderAlertData {
  user: IUser;
  blog: IBlog;
  readingItem: IReadingList;
  alertTime: Date;
}
export interface validateAlertTimeDateFormatRequestBody {
  alertTime: string;
  parsedDate: Date;
}
export interface ReadingListSettingsRequestBody {
  listItemId: ObjectId;
  alertTime: Date;
  alertInfo: ReminderAlertData;
}

export interface DeleteReminderAlert {}

export interface ReadingListSettingsRequestParams {
  itemId: ObjectId;
}
