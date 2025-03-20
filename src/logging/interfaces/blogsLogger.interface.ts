import { ObjectId } from "mongoose";

/**
 * Interface for logging blog-related events in the system.
 */
export interface IBlogsLogger {
  /**
   * Log a failed blog post creation event.
   * @param userId - The ID of the user attempting to create the blog post.
   * @param errMessage - The error message explaining why the creation failed.
   */
  logFailedBlogPostCreation(userId: ObjectId, errMessage: any): void;

  /**
   * Log a failed blog post deletion event, either by the blog owner or admin.
   * @param userId - The ID of the user attempting to delete the blog post.
   * @param errMessage - The error message explaining why the deletion failed.
   * @param blogId - The ID of the blog post being deleted.
   * @param ownerOperation - A boolean indicating if the operation is by the owner of the blog.
   * @param adminOperation - A boolean indicating if the operation is by an admin.
   */
  logFailedBlogDeletion(
    userId: ObjectId,
    errMessage: any,
    blogId: ObjectId,
    ownerOperation: boolean,
    adminOperation: boolean
  ): void;
}
