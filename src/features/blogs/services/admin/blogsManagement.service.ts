// Packages imports
import { ParsedQs } from "qs";

import { ObjectId } from "mongoose";

// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError, handleServiceError } from "@shared/index";

import {
  IBlog,
  DeletionStatus,
  ReviewContentStatus,
} from "@features/blogs/interfaces/blog.interface";
import { IUser } from "@features/users";

// queues imports
import { BlogsQueueJobs, blogQueue } from "@jobs/index";

// logger
import { blogQueueLogger } from "@logging/index";

// interfaces imports
import { IBlogManagementService } from "../../interfaces/index";

export class BlogManagementService implements IBlogManagementService {
  /**
   * Deletes a blog post permanently.
   */

  public async deleteBlogPost(
    blogAuthor: IUser,
    blogPost: IBlog,
    userAdmin: IUser
  ): Promise<void> {
    try {
      blogPost.toBeDeleted = true;
      blogPost.deletionStatus = DeletionStatus.PENDING;
      await blogPost.save();

      // register blog post background deletion job
      blogQueue.add(BlogsQueueJobs.DeleteBlog, {
        blog: blogPost,
      });
      blogQueue.add(BlogsQueueJobs.SendDeleteBlogEmail, {
        blogPost: blogPost,
        blogAuthor: blogAuthor,
      });
      // log the deletion of the blog post
      blogQueueLogger.logBlogPostDeletion(
        blogPost._id,
        userAdmin.email,
        new Date()
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Retrieves a single blog post by its ID.
   */

  public async getBlogPost(blogPostId: ObjectId): Promise<IBlog> {
    try {
      const blogPost = await BlogModel.findById(blogPostId);
      if (!blogPost) {
        throw new AppError("Blog post not found", 404);
      }
      return blogPost;
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Retrieves all blog posts.
   */

  public async getAllBlogPosts(requestQuery: ParsedQs) {
    try {
      const feature = new APIFeatures(BlogModel.find(), requestQuery)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const blogs: IBlog[] = await feature.execute();
      return blogs;
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Retrieves all blog posts by a specific user.
   */
  public async getAllBlogPostsByUser(
    userId: ObjectId,
    requestQuery: ParsedQs
  ): Promise<IBlog[]> {
    try {
      const feature = new APIFeatures(
        BlogModel.find({ author: userId }),
        requestQuery
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const blogs: IBlog[] = await feature.execute();
      return blogs;
    } catch (err: any) {
      handleServiceError(err);
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
      blogPost.isPublished = false;
      blogPost.underReview = true;
      blogPost.addToUnderReviewAt = new Date();
      blogPost.reviewStatus = ReviewContentStatus.PENDING;
      blogPost.addToUnderReviewBy = userAdmin._id;
      await blogPost.save();

      // add email send queue
      blogQueue.add(BlogsQueueJobs.SendUnPublishedBlogEmail, {
        blogPost: blogPost,
        blogAuthor: blogAuthor,
      });
      // log the action
      blogQueueLogger.logBlogPostUnPublishedAction(
        blogPost._id,
        new Date(),
        userAdmin.email
      );
    } catch (err: any) {
      handleServiceError(err);
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
      blogPost.isPublished = true;
      blogPost.underReview = false;
      blogPost.addToUnderReviewAt = undefined;
      blogPost.reviewStatus = ReviewContentStatus.APPROVED;
      blogPost.reviewedAt = new Date();
      blogPost.reviewedBy = userAdmin._id;
      await blogPost.save();

      // add email send queue
      blogQueue.add(BlogsQueueJobs.SendRepublishedBlogEmail, {
        blogPost: blogPost,
        blogAuthor: blogAuthor,
      });
      // log the action
      blogQueueLogger.logBlogPostRepublishedAction(
        blogPost._id,
        new Date(),
        userAdmin.email
      );
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
