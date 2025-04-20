import { ObjectId } from "mongoose";
import { ContentReportingStatus } from "../index";
export interface IContentReportingManagementService {
  processReport(): Promise<void>;
  updateReportStatus(
    reportId: ObjectId,
    reportStatus: ContentReportingStatus
  ): Promise<void>;
  archiveReport(reportId: ObjectId): Promise<void>;
  unarchiveReport(reportId: ObjectId): Promise<void>;
}
