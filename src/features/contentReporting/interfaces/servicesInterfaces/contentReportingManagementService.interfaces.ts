import { ObjectId } from "mongoose";
import { ContentReportingStatus, ProcessReportRequestData } from "../index";

/**
 * Interface for the Content Reporting Management Service.
 * Defines methods for managing content reporting operations.
 */
export interface IContentReportingManagementService {
  /**
   * Processes a content report with the provided data.
   * @param reportProcessedData - The data required to process the report.
   * @param reportId - The unique identifier of the content report to process.
   * @returns A promise that resolves when the processing is complete.
   */
  processReport(
    reportProcessedData: ProcessReportRequestData,
    reportId: ObjectId
  ): Promise<void>;

  /**
   * Updates the status of a content report.
   * @param reportId - The unique identifier of the content report.
   * @param reportStatus - The new status to set for the report.
   * @returns A promise that resolves when the status update is complete.
   */
  updateReportStatus(
    reportId: ObjectId,
    reportStatus: ContentReportingStatus
  ): Promise<void>;

  /**
   * Archives a content report.
   * @param reportId - The unique identifier of the content report to archive.
   * @returns A promise that resolves when the archiving is complete.
   */
  archiveReport(reportId: ObjectId): Promise<void>;

  /**
   * Unarchives a content report.
   * @param reportId - The unique identifier of the content report to unarchive.
   * @returns A promise that resolves when the unarchiving is complete.
   */
  unarchiveReport(reportId: ObjectId): Promise<void>;
}
