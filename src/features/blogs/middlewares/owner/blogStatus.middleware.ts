//express imports
import { Response, Request } from "express";

// shard imports
import { AppError, catchAsync } from "@shared/index";

// interfaces imports
import {
  BlogStatusRequestBody,
  BlogStatusRequestParams,
} from "../../interfaces/blogStatusRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import BlogModel from "@features/blogs/models/blog.model";
export class BlogStatusMiddleware {
  public static validateBlogExists = catchAsync(
    async (
      req: Request<BlogStatusRequestParams, {}, BlogStatusRequestBody>,
      res: Response,
      next: Function
    ) => {
      const blog: IBlog | null = await BlogModel.findOne({
        _id: req.params.blogId,
        author: req.user._id,
      });
      if (!blog) {
        return next(
          new AppError(
            `No blog exist with this id and related to thus user.`,
            404
          )
        );
      }
      req.body.blogPost = blog;
      next();
    }
  );

  public static validateConvertToPrivate = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: Function
    ) => {
      const { blogPost } = req.body;
      if (blogPost.isPrivate) {
        return next(new AppError(`This blog post is already private.`, 400));
      }
      next();
    }
  );

  public static validateConvertToPublic = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: Function
    ) => {
      const { blogPost } = req.body;
      if (!blogPost.isPrivate) {
        return next(new AppError(`This blog post is already public.`, 400));
      }
      next();
    }
  );

  public static validateArchiveBlogPost = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: Function
    ) => {
      const { blogPost } = req.body;
      if (blogPost.isArchived) {
        return next(new AppError(`This blog post is already archived.`, 400));
      }
      next();
    }
  );

  public static validateUneArchivedBlogPost = catchAsync(
    async (
      req: Request<{}, {}, BlogStatusRequestBody>,
      res: Response,
      next: Function
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
