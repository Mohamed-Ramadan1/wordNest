import {
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "../interfaces/index";
import { ParsedQs } from "qs";

/**
 * Interface for the Analytics Reports Repository.
 * Defines methods to retrieve analytics data for various collections from a data source.
 */
export interface IAnalyticsReportsRepository {
  /**
   * Retrieves analytics data for all blogs based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics data.
   * @returns A promise that resolves to an array of blog analytics data.
   */
  getAllBlogsAnalytics(
    queryParams: ParsedQs
  ): Promise<IBlogsCollectionAnalytics[]>;

  /**
   * Retrieves analytics data for all users based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics data.
   * @returns A promise that resolves to an array of user analytics data.
   */
  getAllUsersAnalytics(
    queryParams: ParsedQs
  ): Promise<IUsersCollectionAnalytics[]>;

  /**
   * Retrieves analytics data for all support tickets based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics data.
   * @returns A promise that resolves to an array of support ticket analytics data.
   */
  getAllSupportTicketsAnalytics(
    queryParams: ParsedQs
  ): Promise<ISupportTicketsCollectionAnalytics[]>;

  /**
   * Retrieves analytics data for all content reporting based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics data.
   * @returns A promise that resolves to an array of content reporting analytics data.
   */
  getAllContentReportingAnalytics(
    queryParams: ParsedQs
  ): Promise<IContentReportingCollectionAnalytics[]>;
}
