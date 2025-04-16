import { ObjectId } from "mongoose";
import { ContentReportingType } from "../index";
import { IUser } from "@features/users";

export interface ReportRequestData {
  user: IUser;
  content: ObjectId;
  type: ContentReportingType;
  details: string;
}

export interface ContentReportingRequestBody {
  contentReportType: ContentReportingType;
  contentId: ObjectId;
  details: string;
  reportingRequestData: ReportRequestData;
}

export interface DeleteReportData {
  reportId: ObjectId;
  contentId: ObjectId;
  adminId: ObjectId;
  ipAddress: string;
}

export interface DeleteReportRequestBody {
  deleteReportData: DeleteReportData;
}

export interface ContentReportingRequestParams {
  id: ObjectId;
}
