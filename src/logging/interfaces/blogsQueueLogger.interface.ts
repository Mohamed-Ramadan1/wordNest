import { ObjectId } from "mongoose";

/**
 * Interface for logging blog post queue related events.
 */
export interface IBlogsQueueLogger {
  /**
   * Log a failed blog post deletion event.
   * @param errorMessage - The error message explaining why the deletion failed.
   * @param jobAttempt - The number of times the job was attempted.
   * @param blogId - The ID of the blog post being deleted (optional).
   */
  logFailedBlogDeletion(
    errorMessage: string,
    jobAttempt: number,
    blogId?: ObjectId
  ): void;

  /**
   * Log a failed attempt to collect all failed blog deletions and add them back to the delete queue.
   * @param errorMessage - The error message explaining why the collection failed.
   */
  logFailedCollectFailedDeletionBlogs(errorMessage: string): void;

  /**
   * Log a failed attempt to publish a scheduled blog post.
   * @param errorMessage - The error message explaining why the publishing failed.
   * @param jobAttempt - The number of times the job was attempted.
   * @param blogId - The ID of the blog post being published (optional).
   */
  logFailedPublishScheduledBlog(
    errorMessage: string,
    jobAttempt: number,
    blogId?: ObjectId
  ): void;

  /**
   * Log a failed attempt to send a deletion email to the user.
   * @param errorMessage - The error message explaining why the email sending failed.
   * @param jobAttempt - The number of times the job was attempted.
   * @param blogId - The ID of the blog post being deleted (optional).
   * @param userEmail - The email address of the user the email is being sent to.
   */
  logFailedSendDeleteBlogEmail(
    errorMessage: string,
    jobAttempt: number,
    userEmail: string,
    blogId?: ObjectId
  ): void;

  /**
   * Log a failed attempt to send an unpublished blog email to the user.
   * @param errorMessage - The error message explaining why the email sending failed.
   * @param jobAttempt - The number of times the job was attempted.
   * @param blogId - The ID of the blog post being unpublished (optional).
   * @param userEmail - The email address of the user the email is being sent to.
   */
  logFailedSendUnPublishedBlogEmail(
    errorMessage: string,
    jobAttempt: number,
    userEmail: string,
    blogId?: ObjectId
  ): void;

  /**
   * Log a failed attempt to send a republished blog email to the user.
   * @param errorMessage - The error message explaining why the email sending failed.
   * @param jobAttempt - The number of times the job was attempted.
   * @param blogId - The ID of the blog post being republished (optional).
   * @param userEmail - The email address of the user the email is being sent to.
   */
  logFailedSendRepublishedBlogEmail(
    errorMessage: string,
    jobAttempt: number,
    userEmail: string,
    blogId?: ObjectId
  ): void;

  /**
   * Log the blog post deletion action, including details of the user and date.
   * @param blogId - The ID of the blog post being deleted.
   * @param userEmail - The email of the user who deleted the blog post.
   * @param deletionDate - The date and time of the deletion.
   */
  logBlogPostDeletion(
    blogId: ObjectId,
    userEmail: string,
    deletionDate: Date
  ): void;

  /**
   * Log the blog post unpublishing action, including details of the user and date.
   * @param blogId - The ID of the blog post being unpublished.
   * @param unPublishedDate - The date and time of unpublishing.
   * @param unPublishedByAdminEmail - The email of the admin who unpublished the blog.
   */
  logBlogPostUnPublishedAction(
    blogId: ObjectId,
    unPublishedDate: Date,
    unPublishedByAdminEmail: string
  ): void;

  /**
   * Log the blog post republishing action, including details of the user and date.
   * @param blogId - The ID of the blog post being republished.
   * @param republishedDate - The date and time of republishing.
   * @param republishedByAdminEmail - The email of the admin who republished the blog.
   */
  logBlogPostRepublishedAction(
    blogId: ObjectId,
    republishedDate: Date,
    republishedByAdminEmail: string
  ): void;
}
