import { Document } from "mongoose";

/**
 * Interface for Blogs Collection Analytics.
 * Extends Mongoose Document to include analytics data for blog collections.
 */
export interface IBlogsCollectionAnalytics extends Document {
  /**
   * The total number of blogs in the collection.
   */
  totalBlogs: number;

  /**
   * The total number of views across all blogs.
   */
  totalViews: number;

  /**
   * The total number of shares across all blogs.
   */
  totalShares: number;

  /**
   * The total number of comments across all blogs.
   */
  totalComments: number;

  /**
   * The total number of interactions (e.g., likes, reactions) across all blogs.
   */
  totalInteractions: number;

  /**
   * The average number of views per blog (optional).
   */
  averageViewsPerBlog?: number;

  /**
   * The average number of shares per blog (optional).
   */
  averageSharesPerBlog?: number;

  /**
   * The average number of comments per blog (optional).
   */
  averageCommentsPerBlog?: number;

  /**
   * The average number of interactions per blog (optional).
   */
  averageInteractionsPerBlog?: number;

  /**
   * The number of blogs published today (optional).
   */
  blogsPublishedToday?: number;

  /**
   * The number of blogs published this month (optional).
   */
  blogsPublishedThisMonth?: number;

  /**
   * The number of blogs that are archived (optional).
   */
  blogsArchived?: number;

  /**
   * The number of blogs currently under review (optional).
   */
  blogsUnderReview?: number;

  /**
   * The number of private blogs (optional).
   */
  blogsPrivate?: number;

  /**
   * An array of the most popular tags used across all blogs (optional).
   */
  mostPopularTags?: string[];

  /**
   * An array of the most popular categories used across all blogs (optional).
   */
  mostPopularCategories?: string[];

  /**
   * The date and time when the analytics were last calculated (optional).
   */
  lastCalculatedAt?: Date;

  /**
   * The date and time when the analytics record was created (optional).
   */
  createdAt?: Date;

  /**
   * The date and time when the analytics record was last updated (optional).
   */
  updatedAt?: Date;
}
