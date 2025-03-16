// mongoose imports
import { ObjectId } from "mongoose";

// interfaces imports
import { IBlog } from "../index";

/**
 * Interface for managing blog post operations such as marking for deletion,
 * unpublishing, and publishing. This interface defines the contract for
 * interacting with blog post data in a repository pattern.
 */
export interface IBlogManagementRepository {
  /**
   * Marks a blog post as pending deletion by updating its deletion status.
   *
   * @param {IBlog} blogPost - The blog post object to be marked for deletion.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} If there is an issue marking the blog post as deleted,
   *                 with a message describing the error.
   *
   * @example
   * await blogManagementRepository.markBlogPostToDelete(blogPost);
   */
  markBlogPostToDelete(blogPost: IBlog): Promise<void>;

  /**
   * Marks a blog post as unpublished and places it under review.
   *
   * @param {IBlog} blogPost - The blog post object to be marked as unpublished.
   * @param {ObjectId} adminId - The ID of the admin who initiated the unpublishing.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} If there is an issue marking the blog post as unpublished,
   *                 with a message describing the error.
   *
   * @example
   * await blogManagementRepository.markBlogPostAsUnpublished(blogPost, adminObjectId);
   */
  markBlogPostAsUnpublished(blogPost: IBlog, adminId: ObjectId): Promise<void>;

  /**
   * Marks a blog post as published and approves its review status.
   *
   * @param {IBlog} blogPost - The blog post object to be marked as published.
   * @param {ObjectId} adminId - The ID of the admin who approved the publishing.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} If there is an issue marking the blog post as published,
   *                 with a message describing the error.
   *
   * @example
   * await blogManagementRepository.markBlogPostAsPublished(blogPost, adminObjectId);
   */
  markBlogPostAsPublished(blogPost: IBlog, adminId: ObjectId): Promise<void>;
}
