import {
  IContentReportingCollectionAnalytics,
  IBlogsCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "./index";

/**
 * Interface defining the contract for an analytics repository.
 * This repository provides methods to retrieve analytics data for various collections,
 * including blogs, users, support tickets, and content reporting.
 */
export interface IAnalyticsRepository {
  /**
   * Retrieves analytics data for the blogs collection.
   * @returns A promise that resolves to an object containing blogs analytics data.
   * @example
   * const blogsAnalytics = await analyticsRepository.getBlogsAnalytics();
   */
  getBlogsAnalytics(): Promise<IBlogsCollectionAnalytics>;

  /**
   * Retrieves analytics data for the users collection.
   * @returns A promise that resolves to an object containing users analytics data.
   * @example
   * const usersAnalytics = await analyticsRepository.getUsersAnalytics();
   */
  getUsersAnalytics(): Promise<IUsersCollectionAnalytics>;

  /**
   * Retrieves analytics data for the support tickets collection.
   * @returns A promise that resolves to an object containing support tickets analytics data.
   * @example
   * const ticketsAnalytics = await analyticsRepository.getSupportTicketsAnalytics();
   */
  getSupportTicketsAnalytics(): Promise<ISupportTicketsCollectionAnalytics>;

  /**
   * Retrieves analytics data for the content reporting collection.
   * @returns A promise that resolves to an object containing content reporting analytics data.
   * @example
   * const reportingAnalytics = await analyticsRepository.getContentReportingAnalytics();
   */
  getContentReportingAnalytics(): Promise<IContentReportingCollectionAnalytics>;
}
