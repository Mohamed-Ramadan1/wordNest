// Importing dependencies for interfaces
import { Request } from "express";
import Redis from "ioredis";
import { ObjectId } from "mongoose";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users_feature";
import {
  UpdateScheduleBlogBodyRequestBody,
  BlogData,
} from "./scheduledBlogsRequest.interface";

// Interface for ScheduledBlogsService
/**
 * Interface for the ScheduledBlogsService class.
 * Provides methods for creating, retrieving, updating, deleting, and rescheduling scheduled blog posts.
 */
export interface IScheduledBlogsService {
  /**
   * Creates a new scheduled blog post.
   * @param blogData The data for the new blog post.
   * @returns {Promise<void>} Resolves when the blog post is created and the scheduled job is added.
   */
  createScheduledBlogPost(blogData: BlogData): Promise<void>;

  /**
   * Retrieves all scheduled blog posts for a user.
   * @param user The user requesting the scheduled blog posts.
   * @param request The request object containing query parameters for pagination and filtering.
   * @returns {Promise<IBlog[]>} An array of scheduled blog posts.
   */
  getAllScheduledBlogPosts(user: IUser, request: Request): Promise<IBlog[]>;

  /**
   * Retrieves a single scheduled blog post.
   * @param blogId The ID of the scheduled blog post to retrieve.
   * @param user The user requesting the blog post.
   * @returns {Promise<IBlog | null>} The requested blog post if found, else null.
   */
  getScheduledBlogPost(blogId: ObjectId, user: IUser): Promise<IBlog>;

  /**
   * Updates an existing scheduled blog post.
   * @param reqBody The body containing the blog update data.
   * @param user The user requesting the update.
   * @returns {Promise<void>} Resolves when the blog post is updated.
   */
  updateScheduledBlogPost(
    reqBody: UpdateScheduleBlogBodyRequestBody,
    user: IUser
  ): Promise<void>;

  /**
   * Deletes a scheduled blog post.
   * @param blogId The ID of the scheduled blog post to delete.
   * @param user The user requesting the deletion.
   * @returns {Promise<void>} Resolves when the blog post is deleted.
   */
  deleteScheduledBlogPost(blogId: ObjectId, user: IUser): Promise<void>;

  /**
   * Reschedules a blog post to a new date.
   * @param blog The blog post to reschedule.
   * @param rescheduleDate The new scheduled date for the blog post.
   * @returns {Promise<void>} Resolves when the blog post is rescheduled.
   */
  rescheduleBlogPost(blog: IBlog, rescheduleDate: Date): Promise<void>;
}

// Interface for Redis client
/**
 * Interface for Redis client instance used for caching.
 */
export interface IRedisClient extends Redis {
  // Custom methods for Redis can be added here if needed.
}

// Interface for Redis cache key
/**
 * Interface for cache key structure used for scheduled blog post caching.
 */
export interface ICacheKey {
  blogId: string;
  userId: string;
}
