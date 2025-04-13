import { IContentReporting } from "../contentReporting.interface";
import { ReportRequestData } from "../requestsInterfaces/contentReportingCRUDRequest.interface";

export interface IContentReportingCRUDService {
  createReportContentRequest: (reportInfo: ReportRequestData) => Promise<void>;
  getReportContentRequest: () => Promise<IContentReporting>;
  getAllReportContentRequests: () => Promise<IContentReporting[]>;
  updateReportContentRequest: () => Promise<void>;
  deleteReportContentRequest: () => Promise<void>;
}
