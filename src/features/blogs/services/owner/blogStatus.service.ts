import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { AppError } from "@utils/index";
export class BlogStatusService {
  /**
   * Converts a blog post to private.
   */
  public static async convertBlogToPrivate(blogPost: IBlog) {
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
  public static async convertBlogToPublic(blogPost: IBlog) {
    try {
      blogPost.isPrivate = false;
      await blogPost.save();
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Archives a blog post instead of deleting it.
   */
  public static async archiveBlogPost(blogPost: IBlog) {
    try {
      blogPost.isArchived = true;
      await blogPost.save();
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Restores an archived blog post back to active status.
   */
  public static async unArchiveBlogPost(blogPost: IBlog) {
    try {
      blogPost.isArchived = false;
      await blogPost.save();
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }
}
