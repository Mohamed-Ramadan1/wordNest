// packages imports
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
// interfaces imports
import {
  IContentReporting,
  ReportRequestData,
  ContentReportingStatus,
} from "../index";

/**
 * Interface for the Content Report Repository.
 * Defines methods for managing content reporting requests.
 */
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
  updateReportStatus(
    reportId: ObjectId,
    reportStatus: ContentReportingStatus
  ): Promise<void>;
  archiveReport(reportId: ObjectId): Promise<void>;
  unarchiveReport(reportId: ObjectId): Promise<void>;
}
