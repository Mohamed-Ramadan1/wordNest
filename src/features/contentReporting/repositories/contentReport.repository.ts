//packages imports
import { inject, injectable } from "inversify";
import { Model, Query } from "mongoose";
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
  ): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(`Error while creating reporting request: ${err.message}`);
    }
  }
}

/* 

  public async getReportingRequest(): Promise<IContentReporting> {}
  public async getReportingRequests(): Promise<IContentReporting[]> {}
  public async updateReportingRequest(): Promise<void> {}
  public async deleteReportingRequest(): Promise<void> {}

  */
