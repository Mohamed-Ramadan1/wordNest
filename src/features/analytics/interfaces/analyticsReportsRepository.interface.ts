import {
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
} from "../interfaces/index";

export interface IAnalyticsReportsRepository {
  getAllBlogsAnalytics(): Promise<IBlogsCollectionAnalytics>;
  getAllUsersAnalytics(): Promise<IUsersCollectionAnalytics>;
  getAllSupportTicketsAnalytics(): Promise<ISupportTicketsCollectionAnalytics>;
  getAllContentReportingAnalytics(): Promise<IContentReportingCollectionAnalytics>;
}
