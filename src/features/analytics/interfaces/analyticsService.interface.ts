export interface IAnalyticsService {
  getBlogsAnalytics(): Promise<void>;
  getUsersAnalytics(): Promise<void>;
  getSupportTicketsAnalytics(): Promise<void>;
}
