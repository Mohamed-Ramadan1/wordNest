// packages imports
import { ObjectId } from "mongoose";

// interfaces imports
import { IBlog } from "../index";

/**
 * Interface for managing blog operations specific to an author, such as retrieving
 * a blog post or a scheduled blog post by its ID and author ID. This interface defines
 * the contract for interacting with blog data from an author's perspective in a repository pattern.
 */
export interface IBlogAuthorRepository {
  /**
   * Retrieves a blog post by its ID and the ID of its author.
   *
   * @param {ObjectId} id - The ID of the blog post to retrieve.
   * @param {ObjectId} authorId - The ID of the author associated with the blog post.
   * @returns {Promise<IBlog>} A promise that resolves to the blog post object.
   * @throws {Error} If the blog post is not found for the given ID and author,
   *                 or if there is an issue retrieving it, with a message describing the error.
   *
   * @example
   * const blog = await blogAuthorRepository.getBlogPostByIdAndAuthor(blogObjectId, authorObjectId);
   */
  getBlogPostByIdAndAuthor(id: ObjectId, authorId: ObjectId): Promise<IBlog>;

  /**
   * Retrieves a scheduled blog post by its ID and the ID of its author.
   *
   * @param {ObjectId} id - The ID of the scheduled blog post to retrieve.
   * @param {ObjectId} authorId - The ID of the author associated with the scheduled blog post.
   * @returns {Promise<IBlog>} A promise that resolves to the scheduled blog post object.
   * @throws {Error} If the scheduled blog post is not found for the given ID and author,
   *                 or if there is an issue retrieving it, with a message describing the error.
   *
   * @example
   * const scheduledBlog = await blogAuthorRepository.getScheduleBlogPostByIdAndAuthor(blogObjectId, authorObjectId);
   */
  getScheduleBlogPostByIdAndAuthor(
    id: ObjectId,
    authorId: ObjectId
  ): Promise<IBlog>;
}
