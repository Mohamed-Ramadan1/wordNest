// packages imports
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
// interfaces imports
import { IContentReporting, ReportRequestData } from "../index";
export interface IContentReportRepository {
  createReportingRequest(reportData: ReportRequestData): Promise<void>;
  getReportingRequests(reqQuery: ParsedQs): Promise<IContentReporting[]>;
  getContentReportById(reportId: ObjectId): Promise<IContentReporting>;
  deleteReportingRequest(reportId: ObjectId): Promise<void>;
}
