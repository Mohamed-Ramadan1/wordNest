import { IBlog } from "@features/blogs/interfaces/blog.interface";

/**
 * Interface defining the structure for BlogStatusService.
 */
export interface IBlogStatusService {
  /**
   * Converts a blog post to private.
   * @param blogPost - The blog post to be made private.
   * @returns A promise that resolves when the operation is complete.
   */
  convertBlogToPrivate(blogPost: IBlog): Promise<void>;

  /**
   * Converts a blog post to public.
   * @param blogPost - The blog post to be made public.
   * @returns A promise that resolves when the operation is complete.
   */
  convertBlogToPublic(blogPost: IBlog): Promise<void>;

  /**
   * Archives a blog post instead of deleting it.
   * @param blogPost - The blog post to be archived.
   * @returns A promise that resolves when the operation is complete.
   */
  archiveBlogPost(blogPost: IBlog): Promise<void>;

  /**
   * Restores an archived blog post back to active status.
   * @param blogPost - The blog post to be unarchived.
   * @returns A promise that resolves when the operation is complete.
   */
  unArchiveBlogPost(blogPost: IBlog): Promise<void>;
}
