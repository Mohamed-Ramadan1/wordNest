/**
 * @package
 */
import { inject, injectable } from "inversify";
/**
 * @package
 */
import Redis from "ioredis";

// utils imports
/**
 * @package
 */
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
/**
 * @package
 */
import {
  IAnalyticsService,
  IAnalyticsRepository,
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "../interfaces/index";

//! The part of redis client instance creation will be refactored to be DI supporting .
// redis client instance creation.
/**
 * @private
 * @constant redisClient
 * @description Redis client instance for caching analytics data
 */
const redisClient = new Redis();

/**
 * @class AnalyticsService
 * @implements {IAnalyticsService}
 * @description Service class for handling analytics-related operations with Redis caching
 */
@injectable()
export class AnalyticsService implements IAnalyticsService {
  /**
   * @constructor
   * @param {IAnalyticsRepository} analyticsRepository - Repository for analytics data operations
   * @param {IErrorUtils} errorUtils - Utility for error handling
   */
  constructor(
    @inject(TYPES.AnalyticsRepository)
    private readonly analyticsRepository: IAnalyticsRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}

  /**
   * @method getBlogsAnalytics
   * @async
   * @description Retrieves analytics data for blogs collection with caching
   * @returns {Promise<IBlogsCollectionAnalytics>} Blogs analytics data
   * @throws {Error} If data retrieval or caching fails
   */
  public async getBlogsAnalytics(): Promise<IBlogsCollectionAnalytics> {
    try {
      const cacheKey = `blogsAnalytics`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const analyticsData: IBlogsCollectionAnalytics =
        await this.analyticsRepository.getBlogsAnalytics();
      await redisClient.set(
        cacheKey,
        JSON.stringify(analyticsData),
        "EX",
        3600
      );

      return analyticsData;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * @method getUsersAnalytics
   * @async
   * @description Retrieves analytics data for users collection with caching
   * @returns {Promise<IUsersCollectionAnalytics>} Users analytics data
   * @throws {Error} If data retrieval or caching fails
   */
  public async getUsersAnalytics(): Promise<IUsersCollectionAnalytics> {
    try {
      const cacheKey = `usersAnalytics`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const analyticsData: IUsersCollectionAnalytics =
        await this.analyticsRepository.getUsersAnalytics();
      await redisClient.set(
        cacheKey,
        JSON.stringify(analyticsData),
        "EX",
        3600
      );
      return analyticsData;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * @method getSupportTicketsAnalytics
   * @async
   * @description Retrieves analytics data for support tickets collection with caching
   * @returns {Promise<ISupportTicketsCollectionAnalytics>} Support tickets analytics data
   * @throws {Error} If data retrieval or caching fails
   */
  public async getSupportTicketsAnalytics(): Promise<ISupportTicketsCollectionAnalytics> {
    try {
      const cacheKey = `supportTicketsAnalytics`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const analyticsData: ISupportTicketsCollectionAnalytics =
        await this.analyticsRepository.getSupportTicketsAnalytics();
      await redisClient.set(
        cacheKey,
        JSON.stringify(analyticsData),
        "EX",
        3600
      );
      return analyticsData;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * @method getContentReportingAnalytics
   * @async
   * @description Retrieves analytics data for content reporting collection with caching
   * @returns {Promise<IContentReportingCollectionAnalytics>} Content reporting analytics data
   * @throws {Error} If data retrieval or caching fails
   */
  public async getContentReportingAnalytics(): Promise<IContentReportingCollectionAnalytics> {
    try {
      const cacheKey = `contentReportingAnalytics`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const analyticsData: IContentReportingCollectionAnalytics =
        await this.analyticsRepository.getContentReportingAnalytics();
      await redisClient.set(
        cacheKey,
        JSON.stringify(analyticsData),
        "EX",
        3600
      );
      return analyticsData;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
