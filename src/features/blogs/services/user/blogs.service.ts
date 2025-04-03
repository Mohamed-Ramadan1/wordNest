// inversify imports
import { inject, injectable } from "inversify";
// Packages imports
import { ParsedQs } from "qs";

import { ObjectId, Model } from "mongoose";

// utils imports
import { APIFeatures, AppError, IErrorUtils, TYPES } from "@shared/index";

import { IBlog } from "@features/blogs/interfaces/blog.interface";

// interfaces imports
import { IBlogsService } from "../../interfaces/index";

@injectable()
export class BlogsService implements IBlogsService {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Retrieves a single blog post by its ID.
   */

  public async getBlogPost(blogPostId: ObjectId): Promise<IBlog> {
    try {
      const blogPost = await this.blogModel.findOne({
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
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Retrieves all blog posts.
   */

  public async getAllBlogPosts(requestQuery: ParsedQs) {
    try {
      const feature = new APIFeatures(
        this.blogModel.find({
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
      this.errorUtils.handleServiceError(err);
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
        this.blogModel.find({
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
      this.errorUtils.handleServiceError(err);
    }
  }
}
