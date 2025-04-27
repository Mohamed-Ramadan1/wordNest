import {
  IContentReportingCollectionAnalytics,
  IBlogsCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "./index";

/**
 * Interface defining the contract for an analytics service.
 * This service provides methods to fetch analytics data for various collections,
 * such as blogs, users, support tickets, and content reporting.
 */
export interface IAnalyticsService {
  /**
   * Fetches analytics data for the blogs collection.
   * @returns A promise that resolves to an object containing blogs analytics data.
   * @example
   * const blogsAnalytics = await analyticsService.getBlogsAnalytics();
   */
  getBlogsAnalytics(): Promise<IBlogsCollectionAnalytics>;

  /**
   * Fetches analytics data for the users collection.
   * @returns A promise that resolves to an object containing users analytics data.
   * @example
   * const usersAnalytics = await analyticsService.getUsersAnalytics();
   */
  getUsersAnalytics(): Promise<IUsersCollectionAnalytics>;

  /**
   * Fetches analytics data for the support tickets collection.
   * @returns A promise that resolves to an object containing support tickets analytics data.
   * @example
   * const ticketsAnalytics = await analyticsService.getSupportTicketsAnalytics();
   */
  getSupportTicketsAnalytics(): Promise<ISupportTicketsCollectionAnalytics>;

  /**
   * Fetches analytics data for the content reporting collection.
   * @returns A promise that resolves to an object containing content reporting analytics data.
   * @example
   * const reportingAnalytics = await analyticsService.getContentReportingAnalytics();
   */
  getContentReportingAnalytics(): Promise<IContentReportingCollectionAnalytics>;
}
