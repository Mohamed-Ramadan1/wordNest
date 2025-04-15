import { IContentReporting } from "../contentReporting.interface";
import {
  ReportRequestData,
  DeleteReportData,
} from "../requestsInterfaces/contentReportingCRUDRequest.interface";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";

/**
 * Interface for Content Reporting CRUD service.
 * This service handles the creation, retrieval, and deletion of content reports.
 */
export interface IContentReportingCRUDService {
  /**
   * Creates a new content report request.
   *
   * @param {ReportRequestData} reportInfo - The data required to create a content report.
   * @returns {Promise<void>} A promise that resolves when the report is created.
   *
   * @example
   * await createReportContentRequest({
   *   contentId: "1234567890abcdef",
   *   reporterId: "0987654321fedcba",
   *   reason: "Inappropriate content"
   * });
   */
  createReportContentRequest: (reportInfo: ReportRequestData) => Promise<void>;

  /**
   * Retrieves a specific content report by its ID.
   *
   * @param {ObjectId} reportId - The ID of the report to retrieve.
   * @returns {Promise<IContentReporting>} A promise that resolves with the report data.
   *
   * @example
   * const report = await getReportContentRequest(new ObjectId("1234567890abcdef"));
   */
  getReportContentRequest: (reportId: ObjectId) => Promise<IContentReporting>;

  /**
   * Retrieves all content report requests that match the given query parameters.
   *
   * @param {ParsedQs} requestQuery - Query parameters for filtering the report list.
   * @returns {Promise<IContentReporting[]>} A promise that resolves with a list of reports.
   *
   * @example
   * const reports = await getAllReportContentRequests({ status: "pending" });
   */
  getAllReportContentRequests: (
    requestQuery: ParsedQs
  ) => Promise<IContentReporting[]>;

  /**
   * Deletes a content report based on the provided delete criteria.
   *
   * @param {DeleteReportData} deleteReportData - The data required to delete a report.
   * @returns {Promise<void>} A promise that resolves when the report is deleted.
   *
   * @example
   * await deleteReportContentRequest({
   *   reportId: new ObjectId("1234567890abcdef"),
   *   requesterId: "admin123"
   * });
   */
  deleteReportContentRequest: (
    deleteReportData: DeleteReportData
  ) => Promise<void>;
}
