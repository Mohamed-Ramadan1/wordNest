// Packages imports
import { ObjectId } from "mongoose";
import Redis from "ioredis";

import { Request } from "express";
// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError, handleServiceError } from "@utils/index";

//interfaces imports
import {
  BlogData,
  UpdatesBlogBodyRequest,
} from "@features/blogs/interfaces/blogOwnerRequest.interface";
import {
  IBlog,
  DeletionStatus,
} from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// logging imports
import { blogsLogger } from "@logging/index";

// queues imports
import {
  BlogsQueueJobs,
  blogQueue,
  CloudinaryQueueJobs,
  cloudinaryQueue,
} from "@jobs/index";

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
      newBlogPost.publishedAt = new Date();
      newBlogPost.createBlogSlug();
      newBlogPost.generateSEOMetadata(blogData);
      await newBlogPost.save();
    } catch (err: any) {
      if (blogData.uploadedImages && blogData.uploadedImages.length > 0) {
        blogData.uploadedImages.forEach((image) => {
          // delete the uploaded images
          cloudinaryQueue.add(CloudinaryQueueJobs.DeleteImage, {
            publicId: image.publicId,
          });
        });
      }
      blogsLogger.logFailedBlogPostCreation(user._id, err.message);
      handleServiceError(err);
    }
  }

  /**
   * Handles the logic for updating a blog post.
   */
  public static async updateBlogPost(
    blogPost: IBlog,
    updatedBlogData: UpdatesBlogBodyRequest,
    user: IUser
  ): Promise<void> {
    const cacheKey = `blog:${blogPost._id}:${user._id}`;

    try {
      // update the blog post
      if (updatedBlogData.title) blogPost.title = updatedBlogData.title;
      if (updatedBlogData.content) blogPost.content = updatedBlogData.content;
      if (updatedBlogData.tags) blogPost.tags = updatedBlogData.tags;
      if (updatedBlogData.categories)
        blogPost.categories = updatedBlogData.categories;
      blogPost.isEdited = true;
      blogPost.editedAt = new Date();
      await blogPost.save();
      await redisClient.del(cacheKey);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Handles the logic for deleting a blog post.
   */
  public static async deleteBlogPost(blogToBeDeleted: IBlog, user: IUser) {
    const cacheKey = `blog:${blogToBeDeleted._id}:${user._id}`;
    try {
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
      handleServiceError(err);
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
        isScheduled: false,
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
      handleServiceError(err);
    }
  }

  /**
   * Retrieves all blog posts.
   */
  public static async getAllBlogPosts(
    user: IUser,
    req: Request
  ): Promise<IBlog[]> {
    // Business logic to fetch a blog post by ID
    try {
      // Apply APIFeatures for filtering, sorting, pagination, etc.
      const features = new APIFeatures(
        BlogModel.find({
          author: user._id,
          toBeDeleted: false,
          isScheduled: false,
        }),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const blogs: IBlog[] = await features.execute();
      return blogs;
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
