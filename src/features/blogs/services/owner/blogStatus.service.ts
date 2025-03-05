import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { AppError, handleServiceError } from "@utils/index";

// interfaces imports
import { IBlogStatusService } from "../../interfaces/index";

export class BlogStatusService implements IBlogStatusService {
  /**
   * Converts a blog post to private.
   */
  public async convertBlogToPrivate(blogPost: IBlog) {
    try {
      blogPost.isPrivate = true;
      await blogPost.save();
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Converts a blog post to public.
   */
  public async convertBlogToPublic(blogPost: IBlog) {
    try {
      blogPost.isPrivate = false;
      await blogPost.save();
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Archives a blog post instead of deleting it.
   */
  public async archiveBlogPost(blogPost: IBlog) {
    try {
      blogPost.isArchived = true;
      await blogPost.save();
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Restores an archived blog post back to active status.
   */
  public async unArchiveBlogPost(blogPost: IBlog) {
    try {
      blogPost.isArchived = false;
      await blogPost.save();
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
