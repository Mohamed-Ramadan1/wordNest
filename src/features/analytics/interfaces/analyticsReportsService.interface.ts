import {
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "./index";

export interface IAnalyticsReportsService {
  getAllBlogsAnalyticsReports(): Promise<void>;
  getAllUsersAnalyticsReports(): Promise<void>;
  getAllSupportTicketsAnalyticsReports(): Promise<void>;
  getAllContentReportingAnalyticsReports(): Promise<void>;
}
