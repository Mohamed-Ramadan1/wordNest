// packages imports
import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";

// shared imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  IContentReportingCRUDService,
  IContentReportRepository,
  DeleteReportData,
  IContentReporting,
  ReportRequestData,
} from "../interfaces/index";

// logs imports
import { IReportContentLogger } from "@logging/interfaces/index";

/**
 * Service class responsible for handling content reporting CRUD operations.
 */
@injectable()
export class ContentReportingCRUDService
  implements IContentReportingCRUDService
{
  constructor(
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportRepository: IContentReportRepository,

    @inject(TYPES.ErrorUtils)
    private readonly errorUtils: IErrorUtils,

    @inject(TYPES.ReportContentLogger)
    private readonly reportContentLogger: IReportContentLogger
  ) {}

  /**
   * Creates a new report content request.
   *
   * @param reportInfo - The report data to be created.
   */
  public async createReportContentRequest(
    reportInfo: ReportRequestData
  ): Promise<void> {
    try {
      await this.contentReportRepository.createReportingRequest(reportInfo);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves a report content request by its ID.
   *
   * @param reportId - The ObjectId of the report to retrieve.
   * @returns The content reporting object.
   */
  public async getReportContentRequest(
    reportId: ObjectId
  ): Promise<IContentReporting> {
    try {
      const reportRequest: IContentReporting =
        await this.contentReportRepository.getContentReportById(reportId);
      return reportRequest;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves all report content requests based on query parameters.
   *
   * @param requestQuery - The parsed query parameters for filtering or pagination.
   * @returns An array of content reporting objects.
   */
  public async getAllReportContentRequests(
    requestQuery: ParsedQs
  ): Promise<IContentReporting[]> {
    try {
      const reportRequests: IContentReporting[] =
        await this.contentReportRepository.getReportingRequests(requestQuery);
      return reportRequests;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Placeholder for future implementation of report content request update logic.
   */
  public async updateReportContentRequest(): Promise<void> {
    try {
      // No implementation yet
    } catch (err: any) {
      // Error handling to be added when implemented
    }
  }

  /**
   * Deletes a report content request and logs the action.
   *
   * @param deleteReportData - Data required to perform the deletion, including admin and content identifiers.
   */
  public async deleteReportContentRequest(
    deleteReportData: DeleteReportData
  ): Promise<void> {
    try {
      await this.contentReportRepository.deleteReportingRequest(
        deleteReportData.reportId
      );

      this.reportContentLogger.logReportContentDeletion(
        deleteReportData.adminId,
        deleteReportData.contentId,
        deleteReportData.reportId
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
