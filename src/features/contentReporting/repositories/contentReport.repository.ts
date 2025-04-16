//packages imports
import { inject, injectable } from "inversify";
import { Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

// interfaces imports
import {
  IContentReporting,
  IContentReportRepository,
  ReportRequestData,
} from "../interfaces/index";

@injectable()
export class ContentReportRepository implements IContentReportRepository {
  constructor(
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IContentReporting[], IContentReporting>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IContentReporting>,
    @inject(TYPES.ContentReportingModel)
    private readonly contentReportingModel: Model<IContentReporting>
  ) {}

  public async createReportingRequest(
    reportData: ReportRequestData
  ): Promise<IContentReporting> {
    try {
      const report: IContentReporting | null =
        await this.contentReportingModel.create(reportData);

      if (!report) {
        throw new Error("Error while creating reporting request.");
      }
      return report;
    } catch (err: any) {
      throw new Error(`Error while creating reporting request: ${err.message}`);
    }
  }

  public async getReportingRequests(
    reqQuery: ParsedQs
  ): Promise<IContentReporting[]> {
    try {
      const features = this.apiFeatures(
        this.contentReportingModel.find(),
        reqQuery
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const reportsRequests: IContentReporting[] = await features.execute();
      return reportsRequests;
    } catch (err: any) {
      throw new Error(
        `Error while fetching reporting requests: ${err.message}`
      );
    }
  }

  public async getContentReportById(
    reportId: ObjectId
  ): Promise<IContentReporting> {
    try {
      const reportRequest: IContentReporting | null =
        await this.contentReportingModel.findById(reportId);

      if (!reportRequest) {
        throw new Error("Reporting request not found with given id.");
      }

      return reportRequest;
    } catch (err: any) {
      throw new Error(`Error while fetching reporting request: ${err.message}`);
    }
  }

  public async deleteReportingRequest(reportId: ObjectId): Promise<void> {
    try {
      const deletedReport: IContentReporting | null =
        await this.contentReportingModel.findByIdAndDelete(reportId);

      if (!deletedReport) {
        throw new Error("Reporting request not found");
      }
    } catch (err: any) {
      throw new Error(`Error while deleting reporting request: ${err.message}`);
    }
  }
}
