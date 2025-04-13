import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IReportContentLogger } from "@logging/interfaces/index";

export class ReportContentLogger implements IReportContentLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("reportContent");
  }

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

  public logReportContentDeletion(userId: ObjectId, contentId: ObjectId): void {
    this.logger.info("Report content deletion", {
      event: "report_content_deletion",
      userId: userId,
      contentId: contentId,
      timestamp: new Date().toISOString(),
    });
  }

  public logReportContentProcessed(
    userId: ObjectId,
    contentId: ObjectId,
    status: string
  ): void {
    this.logger.info("Report content processed", {
      event: "report_content_processed",
      userId: userId,
      contentId: contentId,
      status: status,
      timestamp: new Date().toISOString(),
    });
  }

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
