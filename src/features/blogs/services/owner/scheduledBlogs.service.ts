// express imports
import { Request } from "express";

// mongoose imports
import { ObjectId } from "mongoose";
// models imports
import BlogModel from "@features/blogs/models/blog.model";

// interfaces imports
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// utils imports
import { APIFeatures, AppError } from "@utils/index";
export class ScheduledBlogsService {
  /**
   * Creates a new scheduled blog post.
   */
  public static async createScheduledBlogPost() {
    // Logic to save the scheduled blog post to the database
  }

  /**
   * Updates an existing scheduled blog post.
   */
  public static async updateScheduledBlogPost() {
    // Logic to update the scheduled blog post
  }

  /**
   * Deletes a scheduled blog post.
   */
  public static async deleteScheduledBlogPost(blogId: ObjectId, user: IUser) {
    try {
      const deletedPost: IBlog | null = await BlogModel.findOneAndDelete({
        _id: blogId,
        author: user._id,
        isScheduled: true,
      });

      // If no post was deleted, throw a 404
      if (!deletedPost) {
        throw new AppError(
          "Scheduled blog post not found or unauthorized.",
          404
        );
      }
    } catch (err: any) {
      throw new AppError(
        err.message || "Failed to delete scheduled blog post",
        500
      );
    }
  }

  /**
   * Retrieves all scheduled blog posts.
   */
  public static async getAllScheduledBlogPosts(user: IUser, request: Request) {
    try {
      const features = new APIFeatures(
        BlogModel.find({
          author: user._id,
          isScheduled: true,
        }),
        request.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const scheduledBlogPosts: IBlog[] = await features.execute();
      return scheduledBlogPosts;
    } catch (err: any) {
      throw new AppError(
        err.message || "Failed to retrieve scheduled blog posts",
        500
      );
    }
  }

  /**
   * Retrieves a single scheduled blog post.
   */
  public static async getScheduledBlogPost(blogId: ObjectId, user: IUser) {
    try {
      const blogPost: IBlog | null = await BlogModel.findOne({
        _id: blogId,
        author: user._id,
        isScheduled: true,
      });

      if (!blogPost) {
        throw new AppError(
          "Scheduled blog post not found with this id and related to this user.",
          404
        );
      }

      return blogPost;
    } catch (err: any) {
      throw new AppError(
        err.message || "Failed to retrieve scheduled blog post",
        500
      );
    }
  }

  /**
   * Reschedules a blog post.
   */
  public static async rescheduleBlogPost() {
    // Logic to update the scheduled publish date
  }
}
