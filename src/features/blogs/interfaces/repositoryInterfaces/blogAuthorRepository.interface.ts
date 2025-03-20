import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
import { Request } from "express";

import {
  ScheduledBlogData,
  IBlog,
  UpdateScheduleBlogBodyRequestBody,
  UpdatesBlogBodyRequest,
  BlogData,
} from "../index";

/**
 * Interface defining the contract for blog author repository operations.
 * Provides methods for managing blog posts, scheduled posts, and their lifecycle.
 */
export interface IBlogAuthorRepository {
  /**
   * Creates a new blog post with the provided data.
   * @param {ScheduledBlogData} blogData - The data for the new blog post.
   * @returns {Promise<void>} A promise that resolves when the blog post is created.
   * @throws {Error} If blog post creation fails.
   */
  createBlogPost(blogData: BlogData): Promise<void>;

  /**
   * Updates an existing blog post with new data.
   * @param {IBlog} blogPost - The blog post to update.
   * @param {UpdatesBlogBodyRequest} updatedBlogData - The updated blog data.
   * @returns {Promise<void>} A promise that resolves when the blog post is updated.
   * @throws {Error} If blog post update fails.
   */
  updateBlogPost(
    blogPost: IBlog,
    updatedBlogData: UpdatesBlogBodyRequest
  ): Promise<void>;

  /**
   * Marks a blog post for deletion.
   * @param {IBlog} blogPost - The blog post to delete.
   * @returns {Promise<void>} A promise that resolves when the blog post is marked for deletion.
   * @throws {Error} If blog post deletion fails.
   */
  deleteBlogPost(blogPost: IBlog): Promise<void>;

  /**
   * Retrieves a blog post by its ID and author ID.
   * @param {ObjectId} id - The ID of the blog post.
   * @param {ObjectId} authorId - The ID of the author.
   * @returns {Promise<IBlog>} A promise that resolves with the blog post.
   * @throws {Error} If blog post is not found or retrieval fails.
   */
  getBlogPostByIdAndAuthor(id: ObjectId, authorId: ObjectId): Promise<IBlog>;

  /**
   * Retrieves all blog posts for a specific author with filtering and pagination.
   * @param {ObjectId} authorId - The ID of the author.
   * @param {Request} request - The Express request object containing query parameters.
   * @returns {Promise<IBlog[]>} A promise that resolves with an array of blog posts.
   * @throws {Error} If blog posts retrieval fails.
   */
  getBlogPosts(authorId: ObjectId, request: Request): Promise<IBlog[]>;

  /**
   * Retrieves a scheduled blog post by its ID and author ID.
   * @param {ObjectId} id - The ID of the scheduled blog post.
   * @param {ObjectId} authorId - The ID of the author.
   * @returns {Promise<IBlog>} A promise that resolves with the scheduled blog post.
   * @throws {Error} If scheduled blog post is not found or retrieval fails.
   */
  getScheduleBlogPostByIdAndAuthor(
    id: ObjectId,
    authorId: ObjectId
  ): Promise<IBlog>;

  /**
   * Creates a new scheduled blog post.
   * @param {ScheduledBlogData} blogData - The data for the scheduled blog post.
   * @returns {Promise<void>} A promise that resolves when the scheduled blog post is created.
   * @throws {Error} If scheduled blog post creation fails.
   */
  createScheduleBlogPost(blogData: ScheduledBlogData): Promise<IBlog>;

  /**
   * Retrieves all scheduled blog posts for an author with filtering and pagination.
   * @param {ObjectId} authorId - The ID of the author.
   * @param {ParsedQs} query - The query string parameters for filtering and pagination.
   * @returns {Promise<IBlog[]>} A promise that resolves with an array of scheduled blog posts.
   * @throws {Error} If scheduled blog posts retrieval fails.
   */
  getScheduleBlogPosts(authorId: ObjectId, query: ParsedQs): Promise<IBlog[]>;

  /**
   * Retrieves a specific scheduled blog post by ID and author.
   * @param {ObjectId} blogId - The ID of the scheduled blog post.
   * @param {ObjectId} authorId - The ID of the author.
   * @returns {Promise<IBlog>} A promise that resolves with the scheduled blog post.
   * @throws {Error} If scheduled blog post is not found or retrieval fails.
   */
  getScheduleBlogPost(blogId: ObjectId, authorId: ObjectId): Promise<IBlog>;

  /**
   * Updates a scheduled blog post with new data.
   * @param {UpdateScheduleBlogBodyRequestBody} reqBody - The request body containing the blog and updated data.
   * @returns {Promise<void>} A promise that resolves when the scheduled blog post is updated.
   * @throws {Error} If scheduled blog post update fails.
   */
  updateScheduleBlogPost(
    reqBody: UpdateScheduleBlogBodyRequestBody
  ): Promise<void>;

  /**
   * Deletes a scheduled blog post by ID and author.
   * @param {ObjectId} blogId - The ID of the scheduled blog post.
   * @param {ObjectId} authorId - The ID of the author.
   * @returns {Promise<void>} A promise that resolves when the scheduled blog post is deleted.
   * @throws {Error} If scheduled blog post deletion fails.
   */
  deleteScheduleBlogPost(blogId: ObjectId, authorId: ObjectId): Promise<void>;

  /**
   * Reschedules a blog post to a new date.
   * @param {IBlog} blog - The blog post to reschedule.
   * @param {Date} rescheduleDate - The new scheduled date.
   * @returns {Promise<void>} A promise that resolves when the blog post is rescheduled.
   * @throws {Error} If rescheduling fails.
   */
  rescheduleBlogPost(blog: IBlog, rescheduleDate: Date): Promise<void>;

  /**
   * Marks a blog post as private.
   * @param {IBlog} blog - The blog post to mark as private.
   * @returns {Promise<void>} A promise that resolves when the blog post is marked private.
   * @throws {Error} If marking as private fails.
   */
  markBlogAsPrivate(blog: IBlog): Promise<void>;

  /**
   * Marks a blog post as public.
   * @param {IBlog} blog - The blog post to mark as public.
   * @returns {Promise<void>} A promise that resolves when the blog post is marked public.
   * @throws {Error} If marking as public fails.
   */
  markBlogAsPublic(blog: IBlog): Promise<void>;

  /**
   * Marks a blog post as archived.
   * @param {IBlog} blog - The blog post to mark as archived.
   * @returns {Promise<void>} A promise that resolves when the blog post is marked archived.
   * @throws {Error} If marking as archived fails.
   */
  markBlogAsArchived(blog: IBlog): Promise<void>;

  /**
   * Marks a blog post as un-archived.
   * @param {IBlog} blog - The blog post to mark as un-archived.
   * @returns {Promise<void>} A promise that resolves when the blog post is marked un-archived.
   * @throws {Error} If marking as un-archived fails.
   */
  markBlogAsUnArchived(blog: IBlog): Promise<void>;
}
