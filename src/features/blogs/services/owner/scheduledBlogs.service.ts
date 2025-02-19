// express imports
import { Request } from "express";

// redis import
import Redis from "ioredis";
// mongoose imports
import { ObjectId } from "mongoose";
// models imports
import BlogModel from "@features/blogs/models/blog.model";

// interfaces imports
import {
  IBlog,
  ScheduleStatus,
} from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// utils imports
import { APIFeatures, AppError } from "@utils/index";
import { BlogData } from "@features/blogs/interfaces/scheduledBlogsRequest.interface";
import { blogQueue, BlogsQueueJobs } from "@jobs/index";

// redis client instance creation.
const redisClient = new Redis();

export class ScheduledBlogsService {
  /**
   * Creates a new scheduled blog post.
   */

  public static async createScheduledBlogPost(blogData: BlogData) {
    try {
      const scheduledBlogPost: IBlog = new BlogModel(blogData);
      scheduledBlogPost.isPublished = false;
      scheduledBlogPost.isScheduled = true;
      scheduledBlogPost.scheduleStatus = ScheduleStatus.PENDING;
      scheduledBlogPost.createBlogSlug();
      scheduledBlogPost.generateSEOMetadata(blogData);
      await scheduledBlogPost.save();

      // adding job queue for publishing the blog post in the scheduler date range
      blogQueue.add(
        BlogsQueueJobs.PublishScheduledBlog,
        {
          blogId: scheduledBlogPost._id,
        },
        {
          delay:
            new Date(blogData.scheduledFor).getTime() - new Date().getTime(),
          jobId: scheduledBlogPost._id.toString(),
        }
      );
    } catch (err: any) {
      throw new AppError(
        err.message || "Failed to create scheduled blog post",
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
    const cacheKey = `blog:${blogId}:${user._id}`;
    try {
      // Step 1: Check if data is in Redis cache
      const cachedBlog = await redisClient.get(cacheKey);
      if (cachedBlog) {
        return JSON.parse(cachedBlog); // Return cached response
      }
      const blogPost: IBlog | null = await BlogModel.findOne({
        _id: blogId,
        author: user._id,
        isScheduled: true,
      });

      if (!blogPost) {
        throw new AppError(
          "Scheduled blog post not found with this id and related to this user. or it not a scheduled blog post.",
          404
        );
      }
      //  Store the fetched data in Redis (expires in 1 hour)
      await redisClient.setex(cacheKey, 3600, JSON.stringify(blogPost));

      return blogPost;
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(
        err.message || "Failed to retrieve scheduled blog post",
        500
      );
    }
  }

  /**
   * Updates an existing scheduled blog post.
   */
  //! IN PROGRESS
  public static async updateScheduledBlogPost() {
    try {
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message || "Failed to update blog post.", 500);
    }
  }

  /**
   * Deletes a scheduled blog post.
   */
  public static async deleteScheduledBlogPost(blogId: ObjectId, user: IUser) {
    const cacheKey = `blog:${blogId}:${user._id}`;

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
      // check if it at the cash memory and delete it
      await redisClient.del(cacheKey);
    } catch (err: any) {
      throw new AppError(
        err.message || "Failed to delete scheduled blog post",
        500
      );
    }
  }

  /**
   * Reschedules a blog post.
   */
  public static async rescheduleBlogPost(
    blog: IBlog,
    rescheduleDate: Date
  ): Promise<void> {
    try {
      blog.scheduledFor = rescheduleDate;
      await blog.save();
      const scheduledJob = await blogQueue.getJob(blog._id.toString());
      if (scheduledJob) {
        await scheduledJob.remove();
      }
      // adding job queue for publishing the blog post in the scheduler date range
      blogQueue.add(
        BlogsQueueJobs.PublishScheduledBlog,
        {
          blogId: blog._id,
        },
        {
          delay: new Date(rescheduleDate).getTime() - new Date().getTime(),
          jobId: blog._id.toString(),
        }
      );
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message || "Failed to reschedule blog post", 500);
    }
  }
}
