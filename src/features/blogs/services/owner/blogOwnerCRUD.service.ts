// Packages imports
import { ObjectId } from "mongoose";

// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError } from "@utils/index";

//interfaces imports
import { BlogData } from "@features/blogs/interfaces/blogOwnerRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// logging imports
import { blogsLogger } from "@logging/index";

export class BlogCRUDService {
  /**
   * Handles the logic for creating a blog post.
   */
  public static async createBlogPost(
    blogData: BlogData,
    user: IUser
  ): Promise<void> {
    try {
      const newBlogPost = new BlogModel(blogData);
      newBlogPost.createBlogSlug();
      await newBlogPost.save();
    } catch (err: any) {
      blogsLogger.logFailedBlogPostCreation(user._id, err.message);
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Handles the logic for updating a blog post.
   */
  public static async updateBlogPost() {
    try {
    } catch (err: any) {}
  }

  /**
   * Handles the logic for deleting a blog post.
   */
  public static async deleteBlogPost() {
    try {
    } catch (err: any) {}
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
          "No Blog post found with this id and owned by current logged in user",
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
