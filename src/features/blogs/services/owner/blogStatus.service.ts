// Packages imports
import { inject, injectable } from "inversify";

import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { AppError, IErrorUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IBlogAuthorRepository,
  IBlogStatusService,
} from "../../interfaces/index";

@injectable()
export class BlogStatusService implements IBlogStatusService {
  constructor(
    @inject(TYPES.BlogAuthorRepository)
    private readonly blogAuthorRepository: IBlogAuthorRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Converts a blog post to private.
   */
  public async convertBlogToPrivate(blogPost: IBlog) {
    try {
      await this.blogAuthorRepository.markBlogAsPrivate(blogPost);
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Converts a blog post to public.
   */
  public async convertBlogToPublic(blogPost: IBlog) {
    try {
      await this.blogAuthorRepository.markBlogAsPublic(blogPost);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Archives a blog post instead of deleting it.
   */
  public async archiveBlogPost(blogPost: IBlog) {
    try {
      await this.blogAuthorRepository.markBlogAsArchived(blogPost);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Restores an archived blog post back to active status.
   */
  public async unArchiveBlogPost(blogPost: IBlog) {
    try {
      await this.blogAuthorRepository.markBlogAsUnArchived(blogPost);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
