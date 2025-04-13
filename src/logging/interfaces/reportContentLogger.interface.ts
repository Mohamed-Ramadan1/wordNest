import { ObjectId } from "mongoose";

/**
 * Interface for logging various events related to reporting content.
 */
export interface IReportContentLogger {
  /**
   * Logs the creation of a report on specific content.
   * @param userId - The ID of the user who reported the content.
   * @param contentId - The ID of the content being reported.
   * @param reason - The reason provided for reporting the content.
   */
  logReportContentCreation(
    userId: ObjectId,
    contentId: ObjectId,
    reason: string
  ): void;

  /**
   * Logs the retrieval of a report related to specific content.
   * @param userId - The ID of the user retrieving the report.
   * @param contentId - The ID of the content whose report is being retrieved.
   */
  logReportContentRetrieval(userId: ObjectId, contentId: ObjectId): void;

  /**
   * Logs the update of a report's status.
   * @param userId - The ID of the user updating the report.
   * @param contentId - The ID of the content associated with the report.
   * @param status - The new status of the report (e.g., resolved, pending).
   */
  logReportContentUpdate(
    userId: ObjectId,
    contentId: ObjectId,
    status: string
  ): void;

  /**
   * Logs the deletion of a report related to specific content.
   * @param userId - The ID of the user deleting the report.
   * @param contentId - The ID of the content associated with the deleted report.
   */
  logReportContentDeletion(userId: ObjectId, contentId: ObjectId): void;

  /**
   * Logs the processing of a report, such as moderation actions taken.
   * @param userId - The ID of the user who processed the report.
   * @param contentId - The ID of the content associated with the report.
   * @param status - The result/status of the processing.
   */
  logReportContentProcessed(
    userId: ObjectId,
    contentId: ObjectId,
    status: string
  ): void;

  /**
   * Logs an error that occurred while handling a report.
   * @param userId - The ID of the user involved in the error context.
   * @param contentId - The ID of the content associated with the error.
   * @param error - A description of the error encountered.
   */
  logReportContentError(
    userId: ObjectId,
    contentId: ObjectId,
    error: string
  ): void;
}
