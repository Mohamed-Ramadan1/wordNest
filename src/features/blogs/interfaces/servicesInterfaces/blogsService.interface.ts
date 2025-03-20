import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

/**
 * Interface for BlogsService class.
 * This interface defines methods related to retrieving and managing blog posts.
 */
export interface IBlogsService {
  /**
   * Retrieves a single blog post by its ID.
   * @param blogPostId - The ID of the blog post to retrieve.
   * @returns {Promise<IBlog>} - The blog post object if found.
   * @throws {AppError} - Throws an error if the blog post is not found or does not meet the conditions.
   */
  getBlogPost(blogPostId: ObjectId): Promise<IBlog>;

  /**
   * Retrieves all published and non-private blog posts.
   * Filters, sorts, limits fields, and paginates the result based on the query parameters.
   * @param requestQuery - The query parameters for filtering, sorting, and pagination.
   * @returns {Promise<IBlog[]>} - An array of blog post objects.
   */
  getAllBlogPosts(requestQuery: ParsedQs): Promise<IBlog[]>;

  /**
   * Retrieves all blog posts written by a specific user.
   * Filters the posts by the user's ID and applies the same conditions as `getAllBlogPosts`.
   * @param userId - The ID of the user whose blog posts to retrieve.
   * @param requestQuery - The query parameters for filtering, sorting, and pagination.
   * @returns {Promise<IBlog[]>} - An array of blog post objects written by the user.
   */
  getAllBlogPostsByUser(
    userId: ObjectId,
    requestQuery: ParsedQs
  ): Promise<IBlog[]>;
}
