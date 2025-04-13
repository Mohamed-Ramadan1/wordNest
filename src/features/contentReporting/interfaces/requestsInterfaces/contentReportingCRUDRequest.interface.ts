import { ObjectId } from "mongoose";
import { ContentReportingType } from "../index";

export interface ReportRequestData {
  user: ObjectId;
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

export interface ContentReportingRequestParams {
  id: ObjectId;
}
