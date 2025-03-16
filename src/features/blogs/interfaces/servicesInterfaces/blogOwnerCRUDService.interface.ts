import { ObjectId } from "mongoose";
import { Request } from "express";
import {
  BlogData,
  UpdatesBlogBodyRequest,
} from "@features/blogs/interfaces/blogOwnerRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

/**
 * Interface defining the structure for BlogCRUDService.
 */
export interface IBlogOwnerCRUDService {
  /**
   * Creates a new blog post.
   * @param blogData - The data required to create a blog post.
   * @param user - The user creating the blog post.
   * @returns A promise that resolves when the blog post is created.
   */
  createBlogPost(blogData: BlogData, user: IUser): Promise<void>;

  /**
   * Updates an existing blog post.
   * @param blogPost - The blog post to update.
   * @param updatedBlogData - The updated data for the blog post.
   * @param user - The user updating the blog post.
   * @returns A promise that resolves when the blog post is updated.
   */
  updateBlogPost(
    blogPost: IBlog,
    updatedBlogData: UpdatesBlogBodyRequest,
    user: IUser
  ): Promise<void>;

  /**
   * Deletes a blog post.
   * @param blogToBeDeleted - The blog post to be deleted.
   * @param user - The user requesting deletion.
   * @returns A promise that resolves when the blog post is marked for deletion.
   */
  deleteBlogPost(blogToBeDeleted: IBlog, user: IUser): Promise<void>;

  /**
   * Retrieves a single blog post by ID.
   * @param blogId - The ID of the blog post.
   * @param user - The user requesting the blog post.
   * @returns A promise that resolves with the requested blog post.
   */
  getBlogPost(blogId: ObjectId, user: IUser): Promise<IBlog>;

  /**
   * Retrieves all blog posts owned by the user.
   * @param user - The user requesting the blog posts.
   * @param req - The request object containing query parameters.
   * @returns A promise that resolves with a list of blog posts.
   */
  getAllBlogPosts(user: IUser, req: Request): Promise<IBlog[]>;
}
