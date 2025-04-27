/**
 * Interface for the Analytics Reports Service.
 * Defines methods to retrieve analytics reports for various collections.
 */
import {
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "./index";

import { ParsedQs } from "qs";

export interface IAnalyticsReportsService {
  /**
   * Retrieves analytics reports for all blogs based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of blog analytics reports.
   */
  getAllBlogsAnalyticsReports(
    queryParams: ParsedQs
  ): Promise<IBlogsCollectionAnalytics[]>;

  /**
   * Retrieves analytics reports for all users based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of user analytics reports.
   */
  getAllUsersAnalyticsReports(
    queryParams: ParsedQs
  ): Promise<IUsersCollectionAnalytics[]>;

  /**
   * Retrieves analytics reports for all support tickets based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of support ticket analytics reports.
   */
  getAllSupportTicketsAnalyticsReports(
    queryParams: ParsedQs
  ): Promise<ISupportTicketsCollectionAnalytics[]>;

  /**
   * Retrieves analytics reports for all content reporting based on provided query parameters.
   * @param queryParams - The query parameters for filtering the analytics reports.
   * @returns A promise that resolves to an array of content reporting analytics reports.
   */
  getAllContentReportingAnalyticsReports(
    queryParams: ParsedQs
  ): Promise<IContentReportingCollectionAnalytics[]>;
}
