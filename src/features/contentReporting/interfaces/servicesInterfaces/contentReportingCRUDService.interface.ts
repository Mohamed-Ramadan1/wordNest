import { IContentReporting } from "../contentReporting.interface";
import {
  ReportRequestData,
  DeleteReportData,
} from "../requestsInterfaces/contentReportingCRUDRequest.interface";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
export interface IContentReportingCRUDService {
  createReportContentRequest: (reportInfo: ReportRequestData) => Promise<void>;
  getReportContentRequest: (reportId: ObjectId) => Promise<IContentReporting>;
  getAllReportContentRequests: (
    requestQuery: ParsedQs
  ) => Promise<IContentReporting[]>;
  updateReportContentRequest: () => Promise<void>;
  deleteReportContentRequest: (
    deleteReportData: DeleteReportData
  ) => Promise<void>;
}
