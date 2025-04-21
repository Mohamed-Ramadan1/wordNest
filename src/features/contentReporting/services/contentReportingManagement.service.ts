// packages imports
import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";

// shard imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  ContentReportingStatus,
  IContentReportingManagementService,
  IContentReportRepository,
  ProcessReportRequestData,
} from "../interfaces/index";

// logs imports
import { IReportContentLogger } from "@logging/interfaces/index";

/**
 * Service for managing content reporting operations.
 * Handles processing, updating, archiving, and unarchiving of content reports.
 */
@injectable()
export class ContentReportingManagementService
  implements IContentReportingManagementService
{
  /**
   * Creates an instance of ContentReportingManagementService.
   * @param errorUtils - Utility for handling and formatting errors.
   * @param contentReportRepository - Repository for accessing content reporting data.
   * @param reportContentLogger - Logger for recording report processing actions.
   */
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportRepository: IContentReportRepository,
    @inject(TYPES.ReportContentLogger)
    private readonly reportContentLogger: IReportContentLogger
  ) {}

  /**
   * Processes a content report with the provided data and logs the action.
   * @param reportProcessedData - The data required to process the report.
   * @param reportId - The unique identifier of the content report to process.
   * @returns A promise that resolves when the report is processed and logged.
   * @throws Error if the processing or logging fails, handled by errorUtils.
   */
  public processReport = async (
    reportProcessedData: ProcessReportRequestData,
    reportId: ObjectId
  ): Promise<void> => {
    try {
      await this.contentReportRepository.processReport(
        reportProcessedData,
        reportId
      );

      this.reportContentLogger.logReportContentProcessed(
        reportProcessedData.processedBy,
        reportId,
        reportProcessedData.processedNotes,
        reportProcessedData.resolutionType
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Updates the status of a content report.
   * @param reportId - The unique identifier of the content report.
   * @param reportStatus - The new status to set for the report.
   * @returns A promise that resolves when the status update is complete.
   * @throws Error if the update fails, handled by errorUtils.
   */
  public updateReportStatus = async (
    reportId: ObjectId,
    reportStatus: ContentReportingStatus
  ): Promise<void> => {
    try {
      await this.contentReportRepository.updateReportStatus(
        reportId,
        reportStatus
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Archives a content report.
   * @param reportId - The unique identifier of the content report to archive.
   * @returns A promise that resolves when the archiving is complete.
   * @throws Error if the archiving fails, handled by errorUtils.
   */
  public archiveReport = async (reportId: ObjectId): Promise<void> => {
    try {
      await this.contentReportRepository.archiveReport(reportId);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Unarchives a content report.
   * @param reportId - The unique identifier of the content report to unarchive.
   * @returns A promise that resolves when the unarchiving is complete.
   * @throws Error if the unarchiving fails, handled by errorUtils.
   */
  public unarchiveReport = async (reportId: ObjectId): Promise<void> => {
    try {
      await this.contentReportRepository.unarchiveReport(reportId);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
}
