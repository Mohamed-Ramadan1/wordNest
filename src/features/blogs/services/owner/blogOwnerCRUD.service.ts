// utils imports
import { APIFeatures, AppError } from "@utils/index";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { ObjectId } from "mongoose";
import { IUser } from "@features/users";
import BlogModel from "@features/blogs/models/blog.model";
export class BlogCRUDService {
  /**
   * Handles the logic for creating a blog post.
   */
  public static async createBlogPost() {
    // Business logic for creating a blog post
  }

  /**
   * Handles the logic for updating a blog post.
   */
  public static async updateBlogPost() {
    // Business logic for updating a blog post
  }

  /**
   * Handles the logic for deleting a blog post.
   */
  public static async deleteBlogPost() {
    // Business logic for deleting a blog post
  }

  /**
   * Retrieves a single blog post.
   */
  public static async getBlogPost(
    blogId: ObjectId,
    user: IUser
  ): Promise<IBlog> {
    try {
      // Business logic to fetch a blog post by ID
      const blogPost = await BlogModel.findOne({
        _id: blogId,
        author: user._id,
      });
      if (!blogPost) {
        throw new AppError(
          "No Blog post found with this id and owned by the user",
          404
        );
      }
      return blogPost;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Retrieves all blog posts.
   */
  public static async getAllBlogPosts(): Promise<IBlog[]> {
    // Business logic to fetch a blog post by ID
    const blogs = [{}] as IBlog[];
    return blogs;
  }
}
