// packages imports
import { inject, injectable } from "inversify";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

// interfaces imports
import {
  BlogStatusRequestBody,
  BlogStatusRequestParams,
  IBlogStatusMiddleware,
  IBlogAuthorRepository,
} from "../../interfaces/index";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

@injectable()
export class BlogStatusMiddleware implements IBlogStatusMiddleware {
  constructor(
    @inject(TYPES.BlogAuthorRepository)
    private readonly blogAuthorRepository: IBlogAuthorRepository
  ) {}

  public validateBlogExists = catchAsync(
    async (
      req: Request<BlogStatusRequestParams, {}, BlogStatusRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const blog: IBlog =
        await this.blogAuthorRepository.getBlogPostByIdAndAuthor(
          req.params.blogId,
          req.user._id
        );
      req.body.blogPost = blog;
      next();
    }
  );

  public validateConvertToPrivate = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { blogPost } = req.body;
      if (blogPost.isPrivate) {
        return next(new AppError(`This blog post is already private.`, 400));
      }
      next();
    }
  );

  public validateConvertToPublic = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { blogPost } = req.body;
      if (!blogPost.isPrivate) {
        return next(new AppError(`This blog post is already public.`, 400));
      }
      next();
    }
  );

  public validateArchiveBlogPost = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { blogPost } = req.body;
      if (blogPost.isArchived) {
        return next(new AppError(`This blog post is already archived.`, 400));
      }
      next();
    }
  );

  public validateUneArchivedBlogPost = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { blogPost } = req.body;
      if (!blogPost.isArchived) {
        return next(
          new AppError(`This blog post is already not archived.`, 400)
        );
      }
      next();
    }
  );
}
