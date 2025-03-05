import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

/**
 * Interface representing the Blog Management Service.
 * Provides methods for managing blog posts, including retrieval, deletion, publishing, and unpublishing.
 */
export interface IBlogManagementService {
  /**
   * Marks a blog post for deletion and adds it to a background job queue for permanent deletion.
   * Also notifies the blog author via email and logs the deletion.
   *
   * @param blogAuthor - The author of the blog post.
   * @param blogPost - The blog post to be deleted.
   * @param userAdmin - The admin initiating the deletion.
   * @returns A promise that resolves once the operation is completed.
   */
  deleteBlogPost(
    blogAuthor: IUser,
    blogPost: IBlog,
    userAdmin: IUser
  ): Promise<void>;

  /**
   * Retrieves a blog post by its unique identifier.
   * Throws an error if the blog post is not found.
   *
   * @param blogPostId - The unique identifier of the blog post.
   * @returns A promise resolving to the blog post object.
   */
  getBlogPost(blogPostId: ObjectId): Promise<IBlog>;

  /**
   * Retrieves all blog posts, applying filters, sorting, field limiting, and pagination.
   *
   * @param requestQuery - Query parameters for filtering and pagination.
   * @returns A promise resolving to an array of blog posts.
   */
  getAllBlogPosts(requestQuery: ParsedQs): Promise<IBlog[]>;

  /**
   * Retrieves all blog posts created by a specific user.
   * Applies query parameters for filtering, sorting, and pagination.
   *
   * @param userId - The unique identifier of the user.
   * @param requestQuery - Query parameters for filtering and pagination.
   * @returns A promise resolving to an array of blog posts by the specified user.
   */
  getAllBlogPostsByUser(
    userId: ObjectId,
    requestQuery: ParsedQs
  ): Promise<IBlog[]>;

  /**
   * Unpublishes a blog post, making it invisible to users.
   * Moves the post to the review queue and logs the action.
   *
   * @param blogPost - The blog post to be unpublished.
   * @param blogAuthor - The author of the blog post.
   * @param userAdmin - The admin initiating the unpublishing action.
   * @returns A promise that resolves once the operation is completed.
   */
  unPublishBlogPost(
    blogPost: IBlog,
    blogAuthor: IUser,
    userAdmin: IUser
  ): Promise<void>;

  /**
   * Republishes a previously unpublished blog post.
   * Marks it as approved and visible again to users, while logging the action.
   *
   * @param blogPost - The blog post to be republished.
   * @param blogAuthor - The author of the blog post.
   * @param userAdmin - The admin approving the republishing action.
   * @returns A promise that resolves once the operation is completed.
   */
  rePublishBlogPost(
    blogPost: IBlog,
    blogAuthor: IUser,
    userAdmin: IUser
  ): Promise<void>;
}
