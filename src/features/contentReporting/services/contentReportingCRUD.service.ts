//packages imports
import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";

// shard imports
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
@injectable()
export class ContentReportingCRUDService
  implements IContentReportingCRUDService
{
  constructor(
    @inject(TYPES.ContentReportRepository)
    private readonly contentReportRepository: IContentReportRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.ReportContentLogger)
    private readonly reportContentLogger: IReportContentLogger
  ) {}

  public async createReportContentRequest(
    reportInfo: ReportRequestData
  ): Promise<void> {
    try {
      await this.contentReportRepository.createReportingRequest(reportInfo);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

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

  public async updateReportContentRequest(): Promise<void> {
    try {
    } catch (err: any) {}
  }

  public async deleteReportContentRequest(
    deleteReportData: DeleteReportData
  ): Promise<void> {
    try {
      await this.contentReportRepository.deleteReportingRequest(
        deleteReportData.reportId
      );

      // log the action
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
