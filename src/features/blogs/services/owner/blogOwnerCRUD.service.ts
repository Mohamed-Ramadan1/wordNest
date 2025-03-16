// Packages imports
import { inject, injectable } from "inversify";
import Redis from "ioredis";
import { ObjectId } from "mongoose";
import { Request } from "express";

// shard imports
import { handleServiceError, TYPES } from "@shared/index";

//interfaces imports
import {
  IBlog,
  BlogData,
  UpdatesBlogBodyRequest,
  IBlogAuthorRepository,
} from "../../interfaces/index";
import { IUser } from "@features/users";

// logging imports
import { IBlogsLogger } from "@logging/interfaces";

// queues imports
import {
  BlogsQueueJobs,
  blogQueue,
  CloudinaryQueueJobs,
  cloudinaryQueue,
} from "@jobs/index";

// redis client instance creation.
const redisClient = new Redis();

// interfaces imports
import { IBlogOwnerCRUDService } from "../../interfaces/index";

@injectable()
export class BlogCRUDService implements IBlogOwnerCRUDService {
  constructor(
    @inject(TYPES.BlogsLogger) private readonly blogsLogger: IBlogsLogger,
    @inject(TYPES.BlogAuthorRepository)
    private readonly blogAuthorRepository: IBlogAuthorRepository
  ) {}

  /**
   * Handles the logic for creating a blog post.
   */
  public async createBlogPost(blogData: BlogData, user: IUser): Promise<void> {
    try {
      await this.blogAuthorRepository.createBlogPost(blogData);
    } catch (err: any) {
      if (blogData.uploadedImages && blogData.uploadedImages.length > 0) {
        blogData.uploadedImages.forEach((image) => {
          // delete the uploaded images
          cloudinaryQueue.add(CloudinaryQueueJobs.DeleteImage, {
            publicId: image.publicId,
          });
        });
      }
      this.blogsLogger.logFailedBlogPostCreation(user._id, err.message);
      handleServiceError(err);
    }
  }

  /**
   * Handles the logic for updating a blog post.
   */
  public async updateBlogPost(
    blogPost: IBlog,
    updatedBlogData: UpdatesBlogBodyRequest,
    user: IUser
  ): Promise<void> {
    const cacheKey = `blog:${blogPost._id}:${user._id}`;

    try {
      // update the blog post
      await this.blogAuthorRepository.updateBlogPost(blogPost, updatedBlogData);
      await redisClient.del(cacheKey);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Handles the logic for deleting a blog post.
   */
  public async deleteBlogPost(blogToBeDeleted: IBlog, user: IUser) {
    const cacheKey = `blog:${blogToBeDeleted._id}:${user._id}`;
    try {
      await this.blogAuthorRepository.deleteBlogPost(blogToBeDeleted);

      await redisClient.del(cacheKey);
      blogQueue.add(BlogsQueueJobs.DeleteBlog, {
        blog: blogToBeDeleted,
      });

      // register the deletion in queue to move allow complete deletion in background
    } catch (err: any) {
      // logging the failed deletion
      this.blogsLogger.logFailedBlogDeletion(
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
  public async getBlogPost(blogId: ObjectId, user: IUser): Promise<IBlog> {
    try {
      // Business logic to fetch a blog post by ID
      const cacheKey = `blog:${blogId}:${user._id}`;

      // Step 1: Check if data is in Redis cache
      const cachedBlog = await redisClient.get(cacheKey);
      if (cachedBlog) {
        return JSON.parse(cachedBlog); // Return cached response
      }
      const blogPost: IBlog =
        await this.blogAuthorRepository.getBlogPostByIdAndAuthor(
          blogId,
          user._id
        );
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
  public async getAllBlogPosts(user: IUser, req: Request): Promise<IBlog[]> {
    // Business logic to fetch a blog post by ID
    try {
      const blogs: IBlog[] = await this.blogAuthorRepository.getBlogPosts(
        user._id,
        req
      );
      return blogs;
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
