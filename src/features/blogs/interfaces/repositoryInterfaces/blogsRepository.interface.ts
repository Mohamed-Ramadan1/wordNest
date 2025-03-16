// packages imports
import { ParsedQs } from "qs";
import { Request } from "express";

// mongoose imports
import { ObjectId } from "mongoose";

// interface imports
import { IBlog } from "../index";

/**
 * Interface for managing blog-related operations such as retrieving blogs,
 * fetching blog posts by user, and retrieving a blog by its ID. This interface
 * defines the contract for interacting with blog data in a repository pattern.
 */
export interface IBlogRepository {
  /**
   * Retrieves a list of blogs based on query parameters from an Express request.
   * Supports filtering, sorting, field limiting, and pagination via API features.
   *
   * @param {Request} req - The Express request object containing query parameters.
   * @returns {Promise<IBlog[]>} A promise that resolves to an array of blog objects.
   * @throws {Error} If there is an issue retrieving the blogs, with a message
   *                 describing the error.
   *
   * @example
   * const blogs = await blogsRepository.getBlogs(req);
   */
  getBlogs(req: Request): Promise<IBlog[]>;

  /**
   * Retrieves all blog posts authored by a specific user.
   *
   * @param {ObjectId} userId - The ID of the user whose blog posts are to be retrieved.
   * @returns {Promise<IBlog[]>} A promise that resolves to an array of blog objects.
   * @throws {Error} If there is an issue retrieving the blog posts, with a message
   *                 describing the error.
   *
   * @example
   * const userBlogs = await blogsRepository.getBlogPostsByUser(userObjectId);
   */
  getBlogPostsByUser(userId: ObjectId, query: ParsedQs): Promise<IBlog[]>;

  /**
   * Retrieves a single blog post by its ID.
   *
   * @param {ObjectId} id - The ID of the blog post to retrieve.
   * @returns {Promise<IBlog>} A promise that resolves to the blog post object.
   * @throws {Error} If the blog post is not found or there is an issue retrieving it,
   *                 with a message describing the error.
   *
   * @example
   * const blog = await blogsRepository.getBlogById(blogObjectId);
   */
  getBlogById(id: ObjectId): Promise<IBlog>;
}
