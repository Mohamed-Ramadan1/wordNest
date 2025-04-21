import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IReportContentLogger } from "@logging/interfaces/index";

/**
 * Logger class for tracking content reporting activities.
 * Implements methods to log various content report-related events.
 */
export class ReportContentLogger implements IReportContentLogger {
  private logger: Logger;

  /**
   * Creates an instance of ReportContentLogger.
   * Initializes the logger with the "reportContent" context.
   */
  constructor() {
    this.logger = createLogger("reportContent");
  }

  /**
   * Logs the creation of a content reporting request.
   * @param userId - The ID of the user creating the report.
   * @param contentId - The ID of the content being reported.
   * @param reason - The reason for the report.
   */
  public logReportContentCreation(
    userId: ObjectId,
    contentId: ObjectId,
    reason: string
  ): void {
    this.logger.info("Report content creation", {
      event: "report_content_creation",
      userId: userId,
      contentId: contentId,
      reason: reason,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Logs the retrieval of a content reporting request.
   * @param userId - The ID of the user retrieving the report.
   * @param contentId - The ID of the content associated with the report.
   */
  public logReportContentRetrieval(
    userId: ObjectId,
    contentId: ObjectId
  ): void {
    this.logger.info("Report content retrieval", {
      event: "report_content_retrieval",
      userId: userId,
      contentId: contentId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Logs the update of a content reporting request.
   * @param userId - The ID of the user updating the report.
   * @param contentId - The ID of the content associated with the report.
   * @param status - The new status of the report.
   */
  public logReportContentUpdate(
    userId: ObjectId,
    contentId: ObjectId,
    status: string
  ): void {
    this.logger.info("Report content update", {
      event: "report_content_update",
      userId: userId,
      contentId: contentId,
      status: status,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Logs the deletion of a content reporting request.
   * @param adminId - The ID of the admin performing the deletion.
   * @param contentId - The ID of the content associated with the report.
   * @param reportId - The ID of the report being deleted.
   */
  public logReportContentDeletion(
    adminId: ObjectId,
    contentId: ObjectId,
    reportId: ObjectId
  ): void {
    this.logger.info("Report content deletion", {
      event: "report_content_deletion",
      adminId: adminId,
      contentId: contentId,
      reportId: reportId,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Logs the processing of a content reporting request.
   * @param adminId - The ID of the admin processing the report.
   * @param reportId - The ID of the report being processed.
   * @param notes - Additional notes about the processing.
   * @param status - The new status of the report.
   */
  public logReportContentProcessed(
    adminId: ObjectId,
    reportId: ObjectId,
    notes: string,
    status: string
  ): void {
    this.logger.info("Report content processed", {
      event: "report_content_processed",
      adminId: adminId,
      reportId: reportId,
      notes: notes,
      status: status,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Logs an error related to a content reporting request.
   * @param userId - The ID of the user associated with the error.
   * @param contentId - The ID of the content associated with the error.
   * @param error - The error message.
   */
  public logReportContentError(
    userId: ObjectId,
    contentId: ObjectId,
    error: string
  ): void {
    this.logger.error("Report content error", {
      event: "report_content_error",
      userId: userId,
      contentId: contentId,
      error: error,
      timestamp: new Date().toISOString(),
    });
  }
}
