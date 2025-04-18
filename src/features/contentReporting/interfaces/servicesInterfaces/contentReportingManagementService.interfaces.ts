import { ObjectId } from "mongoose";

export interface IContentReportingManagementService {
  processReport(): Promise<void>;
  updateReportStatus(): Promise<void>;
  archiveReport(reportId: ObjectId): Promise<void>;
  unarchiveReport(reportId: ObjectId): Promise<void>;
}
