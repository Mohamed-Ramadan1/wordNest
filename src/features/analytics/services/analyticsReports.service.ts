/**
 * Service for handling analytics reports business logic.
 * Implements methods to fetch and cache analytics reports for blogs, users, support tickets, and content reporting.
 */

// packages imports
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import Redis from "ioredis";

// utils imports
import { TYPES, IErrorUtils } from "@shared/index";

// interfaces imports
/**
 * @package
 */
import {
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
  IAnalyticsReportsService,
  IAnalyticsReportsRepository,
} from "../interfaces/index";

//! The part of redis client instance creation will be refactored to be DI supporting.
// redis client instance creation.
/**
 * @private
 * @constant redisClient
 * @description Redis client instance for caching analytics data
 */
const redisClient = new Redis();

/**
 * AnalyticsReportsService class to manage analytics reports with caching.
 * Implements the IAnalyticsReportsService interface.
 */
@injectable()
export class AnalyticsReportsService implements IAnalyticsReportsService {
  /**
   * Constructs the AnalyticsReportsService with dependency injection.
   * @param errorUtils - Utility for handling service errors.
   * @param analyticsReportsRepository - Repository for accessing analytics data.
   */
  constructor(
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils,
    @inject(TYPES.AnalyticsReportsRepository)
    private readonly analyticsReportsRepository: IAnalyticsReportsRepository
  ) {}

  /**
   * Fetches blogs analytics reports, utilizing Redis caching.
   * @param params - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of blogs analytics reports.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
  public async getAllBlogsAnalyticsReports(
    params: ParsedQs
  ): Promise<IBlogsCollectionAnalytics[]> {
    try {
      const cashKey = "blogsAnalyticsReports";
      const cachedData = await redisClient.get(cashKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const reports: IBlogsCollectionAnalytics[] =
        await this.analyticsReportsRepository.getAllBlogsAnalytics(params);
      await redisClient.set(cashKey, JSON.stringify(reports), "EX", 3600);
      return reports;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Fetches users analytics reports, utilizing Redis caching.
   * @param params - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of users analytics reports.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
  public async getAllUsersAnalyticsReports(
    params: ParsedQs
  ): Promise<IUsersCollectionAnalytics[]> {
    try {
      const cashKey = "usersAnalyticsReports";
      const cachedData = await redisClient.get(cashKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const reports: IUsersCollectionAnalytics[] =
        await this.analyticsReportsRepository.getAllUsersAnalytics(params);
      await redisClient.set(cashKey, JSON.stringify(reports), "EX", 3600);
      return reports;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Fetches support tickets analytics reports, utilizing Redis caching.
   * @param params - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of support tickets analytics reports.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
  public async getAllSupportTicketsAnalyticsReports(
    params: ParsedQs
  ): Promise<ISupportTicketsCollectionAnalytics[]> {
    try {
      const cashKey = "supportTicketsAnalyticsReports";
      const cachedData = await redisClient.get(cashKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const reports: ISupportTicketsCollectionAnalytics[] =
        await this.analyticsReportsRepository.getAllSupportTicketsAnalytics(
          params
        );
      await redisClient.set(cashKey, JSON.stringify(reports), "EX", 3600);
      return reports;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Fetches content reporting analytics reports, utilizing Redis caching.
   * @param params - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of content reporting analytics reports.
   * @throws Throws an error if the operation fails, handled by errorUtils.
   */
  public async getAllContentReportingAnalyticsReports(
    params: ParsedQs
  ): Promise<IContentReportingCollectionAnalytics[]> {
    try {
      const cashKey = "contentReportingAnalyticsReports";
      const cachedData = await redisClient.get(cashKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const reports: IContentReportingCollectionAnalytics[] =
        await this.analyticsReportsRepository.getAllContentReportingAnalytics(
          params
        );
      await redisClient.set(cashKey, JSON.stringify(reports), "EX", 3600);
      return reports;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
