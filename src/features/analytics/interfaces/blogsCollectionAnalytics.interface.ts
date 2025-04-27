export interface IBlogsCollectionAnalytics {
  totalBlogs: number;
  totalViews: number;
  totalShares: number;
  totalComments: number;
  totalInteractions: number;

  averageViewsPerBlog?: number;
  averageSharesPerBlog?: number;
  averageCommentsPerBlog?: number;
  averageInteractionsPerBlog?: number;

  blogsPublishedToday?: number;
  blogsPublishedThisMonth?: number;
  blogsArchived?: number;
  blogsUnderReview?: number;
  blogsPrivate?: number;

  mostPopularTags?: string[]; // Top used tags across all blogs
  mostPopularCategories?: string[]; // Top used categories

  lastCalculatedAt?: Date; // When the analytics were last updated

  createdAt?: Date;
  updatedAt?: Date;
}
