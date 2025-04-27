/**
 * Repository for handling analytics reports data access.
 * Implements methods to fetch analytics data for blogs, users, support tickets, and content reporting.
 */

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

/**
 * AnalyticsReportsRepository class to manage data access for analytics reports.
 * Implements the IAnalyticsReportsRepository interface.
 */
@injectable()
export class AnalyticsReportsRepository implements IAnalyticsReportsRepository {
  /**
   * Constructs the AnalyticsReportsRepository with dependency injection.
   * @param errorUtils - Utility for handling repository errors.
   * @param blogsCollectionAnalyticsModel - Mongoose model for blogs analytics.
   * @param usersCollectionAnalyticsModel - Mongoose model for users analytics.
   * @param supportTicketsCollectionAnalyticsModel - Mongoose model for support tickets analytics.
   * @param contentReportingCollectionAnalyticsModel - Mongoose model for content reporting analytics.
   * @param apiFeatures - Utility for applying query features like filtering, sorting, and pagination.
   */
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

  /**
   * Fetches all blogs analytics data based on provided query parameters.
   * @param params - The query parameters for filtering, sorting, and pagination.
   * @returns A promise that resolves to an array of blogs analytics data.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
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

  /**
   * Fetches all users analytics data based on provided query parameters.
   * @param params - The query parameters for filtering, sorting, and pagination.
   * @returns A promise that resolves to an array of users analytics data.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
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

  /**
   * Fetches all support tickets analytics data based on provided query parameters.
   * @param params - The query parameters for filtering, sorting, and pagination.
   * @returns A promise that resolves to an array of support tickets analytics data.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
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

  /**
   * Fetches all content reporting analytics data based on provided query parameters.
   * @param params - The query parameters for filtering, sorting, and pagination.
   * @returns A promise that resolves to an array of content reporting analytics data.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
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
