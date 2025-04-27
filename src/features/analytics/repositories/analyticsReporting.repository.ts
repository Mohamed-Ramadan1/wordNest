// packages imports
import { inject, injectable } from "inversify";
import { Model, Query } from "mongoose";
import { ParsedQs } from "qs";

// utils imports
import { TYPES, IErrorUtils, APIFeaturesInterface } from "@shared/index";

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
    private readonly contentReportingCollectionAnalyticsModel: Model<IContentReportingCollectionAnalytics>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<any[], any>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<any>
  ) {}

  public async getAllBlogsAnalytics(
    params: ParsedQs
  ): Promise<IBlogsCollectionAnalytics[]> {
    try {
      const query = this.apiFeatures(
        this.blogsCollectionAnalyticsModel.find(),
        params
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const blogsAnalytics = await query.execute();
      return blogsAnalytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllBlogsAnalytics reports : ${err.message}`
      );
    }
  }

  public async getAllUsersAnalytics(
    params: ParsedQs
  ): Promise<IUsersCollectionAnalytics[]> {
    try {
      const query = this.apiFeatures(
        this.usersCollectionAnalyticsModel.find(),
        params
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const usersAnalytics = await query.execute();
      return usersAnalytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllUsersAnalytics reports : ${err.message}`
      );
    }
  }

  public async getAllSupportTicketsAnalytics(
    params: ParsedQs
  ): Promise<ISupportTicketsCollectionAnalytics[]> {
    try {
      const query = this.apiFeatures(
        this.supportTicketsCollectionAnalyticsModel.find(),
        params
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const supportTicketsAnalytics = await query.execute();
      return supportTicketsAnalytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllSupportTicketsAnalytics reports : ${err.message}`
      );
    }
  }

  public async getAllContentReportingAnalytics(
    params: ParsedQs
  ): Promise<IContentReportingCollectionAnalytics[]> {
    try {
      const query = this.apiFeatures(
        this.contentReportingCollectionAnalyticsModel.find(),
        params
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const contentReportingAnalytics = await query.execute();
      return contentReportingAnalytics;
    } catch (err: any) {
      this.errorUtils.handleRepositoryError(
        `Error in getAllContentReportingAnalytics reports : ${err.message}`
      );
    }
  }
}
