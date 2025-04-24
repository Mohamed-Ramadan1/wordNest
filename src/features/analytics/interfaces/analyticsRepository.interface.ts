export interface IAnalyticsRepository {
  getBlogsAnalytics(): Promise<void>;
  getUsersAnalytics(): Promise<void>;
  getSupportTicketsAnalytics(): Promise<void>;
}
