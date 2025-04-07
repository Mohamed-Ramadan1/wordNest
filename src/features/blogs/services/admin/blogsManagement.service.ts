// Packages imports
import { ParsedQs } from "qs";
import { Request } from "express";
import { inject, injectable } from "inversify";

import { ObjectId } from "mongoose";

// utils imports
import { TYPES, IErrorUtils } from "@shared/index";

import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// queues imports
import { BlogsQueueJobs, blogQueue } from "@jobs/index";

// logger imports
import { IBlogsQueueLogger } from "@logging/interfaces";

// interfaces imports
import {
  IBlogManagementService,
  IBlogManagementRepository,
  IBlogRepository,
} from "../../interfaces/index";

@injectable()
export class BlogManagementService implements IBlogManagementService {
  constructor(
    @inject(TYPES.BlogsQueueLogger)
    private readonly blogQueueLogger: IBlogsQueueLogger,
    @inject(TYPES.BlogManagementRepository)
    private readonly blogManagementRepository: IBlogManagementRepository,
    @inject(TYPES.BlogsRepository)
    private readonly blogsRepository: IBlogRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Deletes a blog post permanently.
   */

  public async deleteBlogPost(
    blogAuthor: IUser,
    blogPost: IBlog,
    userAdmin: IUser
  ): Promise<void> {
    try {
      await this.blogManagementRepository.markBlogPostToDelete(blogPost);

      // register blog post background deletion job
      blogQueue.add(BlogsQueueJobs.DeleteBlog, {
        blog: blogPost,
      });

      blogQueue.add(BlogsQueueJobs.SendDeleteBlogEmail, {
        blogPost: blogPost,
        blogAuthor: blogAuthor,
      });
      // log the deletion of the blog post
      this.blogQueueLogger.logBlogPostDeletion(
        blogPost._id,
        userAdmin.email,
        new Date()
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves a single blog post by its ID.
   */

  public async getBlogPost(blogPostId: ObjectId): Promise<IBlog> {
    try {
      const blogPost: IBlog =
        await this.blogsRepository.getBlogById(blogPostId);

      return blogPost;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves all blog posts.
   */

  public async getAllBlogPosts(request: Request) {
    try {
      const blogs: IBlog[] = await this.blogsRepository.getBlogs(request);
      return blogs;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves all blog posts by a specific user.
   */
  public async getAllBlogPostsByUser(
    userId: ObjectId,
    query: ParsedQs
  ): Promise<IBlog[]> {
    try {
      const blogs: IBlog[] = await this.blogsRepository.getBlogPostsByUser(
        userId,
        query
      );
      return blogs;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Unpublishes a blog post, making it invisible to users.
   */

  public async unPublishBlogPost(
    blogPost: IBlog,
    blogAuthor: IUser,
    userAdmin: IUser
  ): Promise<void> {
    try {
      await this.blogManagementRepository.markBlogPostAsUnpublished(
        blogPost,
        userAdmin._id
      );

      // add email send queue
      blogQueue.add(BlogsQueueJobs.SendUnPublishedBlogEmail, {
        blogPost: blogPost,
        blogAuthor: blogAuthor,
      });
      // log the action
      this.blogQueueLogger.logBlogPostUnPublishedAction(
        blogPost._id,
        new Date(),
        userAdmin.email
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Republishes a previously unpublished blog post.
   */

  public async rePublishBlogPost(
    blogPost: IBlog,
    blogAuthor: IUser,
    userAdmin: IUser
  ): Promise<void> {
    try {
      await this.blogManagementRepository.markBlogPostAsPublished(
        blogPost,
        userAdmin._id
      );

      // add email send queue
      blogQueue.add(BlogsQueueJobs.SendRepublishedBlogEmail, {
        blogPost: blogPost,
        blogAuthor: blogAuthor,
      });
      // log the action
      this.blogQueueLogger.logBlogPostRepublishedAction(
        blogPost._id,
        new Date(),
        userAdmin.email
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
