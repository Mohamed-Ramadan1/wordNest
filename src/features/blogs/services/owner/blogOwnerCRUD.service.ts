// Packages imports
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError } from "@utils/index";

//interfaces imports
import { BlogData } from "@features/blogs/interfaces/blogOwnerRequest.interface";
import {
  IBlog,
  DeletionStatus,
} from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// logging imports
import { blogsLogger } from "@logging/index";

// queues imports
import { BlogsQueueJobs, blogQueue } from "@jobs/index";

// redis client instance creation.
const redisClient = new Redis();

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
  public static async deleteBlogPost(blogToBeDeleted: IBlog, user: IUser) {
    try {
      const cacheKey = `blog:${blogToBeDeleted._id}:${user._id}`;

      blogToBeDeleted.toBeDeleted = true;
      blogToBeDeleted.requestDeleteAt = new Date();
      blogToBeDeleted.deletionStatus = DeletionStatus.PENDING;
      await blogToBeDeleted.save();
      // check if it at the cash memory and delete it
      await redisClient.del(cacheKey);
      blogQueue.add(BlogsQueueJobs.DeleteBlog, {
        blog: blogToBeDeleted,
      });

      // register the deletion in queue to move allow complete deletion in background
    } catch (err: any) {
      // logging the failed deletion
      blogsLogger.logFailedBlogDeletion(
        user._id,
        err.message,
        blogToBeDeleted._id,
        true,
        false
      );
      throw new AppError(err.message, 500);
    }
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
      const cacheKey = `blog:${blogId}:${user._id}`;

      // Step 1: Check if data is in Redis cache
      const cachedBlog = await redisClient.get(cacheKey);
      if (cachedBlog) {
        return JSON.parse(cachedBlog); // Return cached response
      }
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
      //  Store the fetched data in Redis (expires in 1 hour)
      await redisClient.setex(cacheKey, 3600, JSON.stringify(blogPost));

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
