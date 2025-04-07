// Packages imports
import { inject, injectable } from "inversify";

// express imports
import { Request } from "express";

// redis import
import Redis from "ioredis";

// mongoose imports
import { ObjectId } from "mongoose";

// interfaces imports
import {
  IBlog,
  UpdateScheduleBlogBodyRequestBody,
  ScheduledBlogData,
} from "../../interfaces/index";
import { IUser } from "@features/users";

// shard imports
import { IErrorUtils, TYPES } from "@shared/index";

// jobs imports
import { blogQueue, BlogsQueueJobs } from "@jobs/index";

// redis client instance creation.
const redisClient = new Redis();

// interfaces imports
import {
  IBlogAuthorRepository,
  IScheduledBlogsService,
} from "../../interfaces/index";

@injectable()
export class ScheduledBlogsService implements IScheduledBlogsService {
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthorRepository: IBlogAuthorRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Creates a new scheduled blog post.
   */

  public async createScheduledBlogPost(blogData: ScheduledBlogData) {
    try {
      const scheduledBlogPost: IBlog =
        await this.userAuthorRepository.createScheduleBlogPost(blogData);
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
      this.errorUtils.handleServiceError(err);
    }
  }
  /**
   * Retrieves all scheduled blog posts.
   */
  public async getAllScheduledBlogPosts(user: IUser, request: Request) {
    try {
      const scheduledBlogPosts: IBlog[] =
        await this.userAuthorRepository.getScheduleBlogPosts(
          user._id,
          request.query
        );
      return scheduledBlogPosts;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves a single scheduled blog post.
   */
  public async getScheduledBlogPost(blogId: ObjectId, user: IUser) {
    const cacheKey = `blog:${blogId}:${user._id}`;
    try {
      // Step 1: Check if data is in Redis cache
      const cachedBlog = await redisClient.get(cacheKey);
      if (cachedBlog) {
        return JSON.parse(cachedBlog); // Return cached response
      }
      const blogPost: IBlog =
        await this.userAuthorRepository.getScheduleBlogPostByIdAndAuthor(
          blogId,
          user._id
        );

      //  Store the fetched data in Redis (expires in 1 hour)
      await redisClient.setex(cacheKey, 3600, JSON.stringify(blogPost));

      return blogPost;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Updates an existing scheduled blog post.
   */
  public async updateScheduledBlogPost(
    reqBody: UpdateScheduleBlogBodyRequestBody,
    user: IUser
  ) {
    const cacheKey = `blog:${reqBody.blog._id}:${user._id}`;

    try {
      await this.userAuthorRepository.updateScheduleBlogPost(reqBody);
      await redisClient.del(cacheKey);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Deletes a scheduled blog post.
   */
  public async deleteScheduledBlogPost(blogId: ObjectId, user: IUser) {
    const cacheKey = `blog:${blogId}:${user._id}`;

    try {
      await this.userAuthorRepository.deleteScheduleBlogPost(blogId, user._id);

      // check if it at the cash memory and delete it
      await redisClient.del(cacheKey);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Reschedules a blog post.
   */
  public async rescheduleBlogPost(
    blog: IBlog,
    rescheduleDate: Date
  ): Promise<void> {
    try {
      await this.userAuthorRepository.rescheduleBlogPost(blog, rescheduleDate);
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
      this.errorUtils.handleServiceError(err);
    }
  }
}
