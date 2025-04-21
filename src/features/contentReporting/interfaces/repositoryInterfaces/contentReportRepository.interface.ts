/**
 * Interface for the Content Report Repository.
 * Defines methods for managing content reporting requests.
 */
import { ObjectId } from "mongoose";
/**
 * Interface for the Content Report Repository.
 * Defines methods for managing content reporting requests.
 */
import { ParsedQs } from "qs";
/**
 * Interface for the Content Report Repository.
 * Defines methods for managing content reporting requests.
 */
import {
  IContentReporting,
  ReportRequestData,
  ContentReportingStatus,
  ProcessReportRequestData,
} from "../index";

export interface IContentReportRepository {
  /**
   * Creates a new content reporting request.
   * @param reportData - The data required to create a reporting request.
   * @returns A promise that resolves to the created content reporting object.
   */
  createReportingRequest(
    reportData: ReportRequestData
  ): Promise<IContentReporting>;

  /**
   * Retrieves a list of content reporting requests based on query parameters.
   * @param reqQuery - The query parameters for filtering reporting requests.
   * @returns A promise that resolves to an array of content reporting objects.
   */
  getReportingRequests(reqQuery: ParsedQs): Promise<IContentReporting[]>;

  /**
   * Retrieves a specific content report by its ID.
   * @param reportId - The unique identifier of the content report.
   * @returns A promise that resolves to the content reporting object.
   */
  getContentReportById(reportId: ObjectId): Promise<IContentReporting>;

  /**
   * Deletes a content reporting request by its ID.
   * @param reportId - The unique identifier of the content report to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteReportingRequest(reportId: ObjectId): Promise<void>;

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
