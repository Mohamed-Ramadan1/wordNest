export interface IContentReportingManagementService {
  processReport(reportId: string): Promise<void>;
  updateReportStatus(
    reportId: string,
    status: string,
    resolutionType?: string
  ): Promise<void>;
  archiveReport(reportId: string): Promise<void>;
  unarchiveReport(reportId: string): Promise<void>;
}
