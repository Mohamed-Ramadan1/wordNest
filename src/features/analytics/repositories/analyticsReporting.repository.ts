// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

// utils imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
import {
  IAnalyticsReportsRepository,
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "../interfaces/index";

@injectable()
export class AnalyticsReportsRepository implements IAnalyticsReportsRepository {
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.BlogCollectionAnalyticsModel)
    private readonly blogsCollectionAnalyticsModel: Model<IBlogsCollectionAnalytics>,
    @inject(TYPES.UserCollectionAnalyticsModel)
    private readonly usersCollectionAnalyticsModel: Model<IUsersCollectionAnalytics>,
    @inject(TYPES.SupportTicketCollectionAnalyticsModel)
    private readonly supportTicketsCollectionAnalyticsModel: Model<ISupportTicketsCollectionAnalytics>,
    @inject(TYPES.ContentReportingCollectionAnalyticsModel)
    private readonly contentReportingCollectionAnalyticsModel: Model<IContentReportingCollectionAnalytics>
  ) {}

  public async getAllBlogsAnalytics(): Promise<IBlogsCollectionAnalytics> {
    try {
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllBlogsAnalytics reports : ${err.message}`
      );
    }
  }

  public async getAllUsersAnalytics(): Promise<IUsersCollectionAnalytics> {
    try {
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllUsersAnalytics reports : ${err.message}`
      );
    }
  }

  public async getAllSupportTicketsAnalytics(): Promise<ISupportTicketsCollectionAnalytics> {
    try {
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllSupportTicketsAnalytics reports : ${err.message}`
      );
    }
  }

  public async getAllContentReportingAnalytics(): Promise<IContentReportingCollectionAnalytics> {
    try {
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllContentReportingAnalytics reports : ${err.message}`
      );
    }
  }
}
