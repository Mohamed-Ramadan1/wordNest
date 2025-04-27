import {
  ContentReportingStatus,
  ContentReportingType,
  ResolutionType,
} from "@features/contentReporting/interfaces";

export interface IContentReportingCollectionAnalytics {
  // Total Metrics
  totalReports: number;
  totalArchivedReports: number; // Reports with isArchived: true
  totalProcessedReports: number; // Reports with processedAt set

  // Status-Based Metrics
  reportsByStatus: { [key in ContentReportingStatus]: number }; // e.g., { PENDING: 50, APPROVED: 20 }
  reportsByType: { [key in ContentReportingType]: number }; // e.g., { SPAM: 30, INAPPROPRIATE: 15 }
  reportsByResolutionType: { [key in ResolutionType]: number }; // e.g., { CONTENT_REMOVED: 10, DISMISSED: 25 }

  // Temporal Metrics
  reportsCreatedToday?: number; // Reports created today (based on createdAt)
  reportsCreatedThisMonth?: number; // Reports created this month
  reportsProcessedToday?: number; // Reports processed today (based on processedAt)
  reportsProcessedThisMonth?: number; // Reports processed this month
  reportsArchivedToday?: number; // Reports archived today
  reportsArchivedThisMonth?: number; // Reports archived this month

  // Performance Metrics
  averageProcessingTimeHours?: number; // Average time to process (createdAt to processedAt)
  averageReportsPerBlog?: number; // Average reports per reported blog
  averageReportsPerUser?: number; // Average reports per reporting user

  // Engagement Metrics
  mostReportedBlogs?: string[]; // Top blog IDs or titles by report count (e.g., top 5)
  mostActiveReportingUsers?: string[]; // Top user IDs or emails by report count (e.g., top 5)
  mostActiveProcessingAdmins?: string[]; // Top admin IDs or emails by processed reports (e.g., top 5)

  // Administrative Metrics
  reportsWithProcessingNotes?: number; // Reports with non-empty processedNotes

  // Other Insights
  mostCommonReportTypes?: string[]; // Top report types (e.g., top 5)
  mostCommonResolutionTypes?: string[]; // Top resolution types (e.g., top 5)

  // Temporal Fields
  lastCalculatedAt?: Date; // When analytics were last updated
  createdAt?: Date; // When analytics record was created
  updatedAt?: Date; // When analytics record was last updated
}
