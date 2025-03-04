// Packages imports
import { ParsedQs } from "qs";

import { ObjectId } from "mongoose";

// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError, handleServiceError } from "@utils/index";

import { IBlog } from "@features/blogs/interfaces/blog.interface";

// interfaces imports
import { IBlogsService } from "../../interfaces/index";
export class BlogsService implements IBlogsService {
  /**
   * Retrieves a single blog post by its ID.
   */

  public async getBlogPost(blogPostId: ObjectId): Promise<IBlog> {
    try {
      const blogPost = await BlogModel.findOne({
        _id: blogPostId,
        isPublished: true,
        isPrivate: false,
        toBeDeleted: false,
        isArchived: false,
        underReview: false,
      });
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
      const feature = new APIFeatures(
        BlogModel.find({
          isPublished: true,
          isPrivate: false,
          toBeDeleted: false,
          isArchived: false,
          underReview: false,
        }),
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
   * Retrieves all blog posts by a specific user.
   */
  public async getAllBlogPostsByUser(
    userId: ObjectId,
    requestQuery: ParsedQs
  ): Promise<IBlog[]> {
    try {
      const feature = new APIFeatures(
        BlogModel.find({
          author: userId,
          isPublished: true,
          isPrivate: false,
          toBeDeleted: false,
          isArchived: false,
          underReview: false,
        }),
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
}
