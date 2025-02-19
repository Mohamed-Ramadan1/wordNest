// Packages imports
import { ParsedQs } from "qs";

import { ObjectId } from "mongoose";
import Redis from "ioredis";
// model imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { APIFeatures, AppError } from "@utils/index";

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

export class BlogManagementService {
  /**
   * Deletes a blog post permanently.
   */
  //! IN PROGRESS
  public static async deleteBlogPost() {}

  /**
   * Retrieves a single blog post by its ID.
   */
  //! IN PROGRESS
  public static async getBlogPost() {}

  /**
   * Retrieves all blog posts.
   */
  //! IN PROGRESS
  public static async getAllBlogPosts() {}

  /**
   * Retrieves all blog posts by a specific user.
   */
  public static async getAllBlogPostsByUser(
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
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message || "Failed to get user blogs posts", 500);
    }
  }

  /**
   * Unpublishes a blog post, making it invisible to users.
   */
  //! IN PROGRESS
  public static async unPublishBlogPost() {}

  /**
   * Republishes a previously unpublished blog post.
   */
  //! IN PROGRESS
  public static async rePublishBlogPost() {}
}
