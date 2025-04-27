// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import { catchAsync, IErrorUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  BlogManagementRequestBody,
  BlogsManagementRequestParams,
  IBlogsManagementMiddleware,
  IBlog,
  IBlogRepository,
} from "../../interfaces/index";

// cross features imports
import { IUser } from "@features/users";

// queues imports
import { blogQueue, BlogsQueueJobs } from "@jobs/index";

@injectable()
export class BlogsManagementMiddleware implements IBlogsManagementMiddleware {
  constructor(
    @inject(TYPES.BlogsRepository)
    private readonly blogsRepository: IBlogRepository,
    @inject(TYPES.USER_MODEL) private readonly userModel: Model<IUser>,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  public validateBlogPostManagementRequest = catchAsync(
    async (
      req: Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const blog: IBlog = await this.blogsRepository.getBlogById(
        req.params.blogId
      );

      const blogAuthor: IUser | null = await this.userModel.findById(
        blog.author
      );

      if (!blogAuthor) {
        blogQueue.add(BlogsQueueJobs.DeleteBlog, {
          blog: blog,
        });

        return this.errorUtils.handleAppError("Blog author not found.", 404);
      }
      req.body.blogOwner = blogAuthor;
      req.body.blogPost = blog;
      req.body.userAdmin = req.user;
      next();
    }
  );

  public validateUnPublishBlogStatus = catchAsync(
    async (
      req: Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      if (req.body.blogPost.isPublished === false) {
        return this.errorUtils.handleAppError(
          "Blog post is already unpublished.",
          400
        );
      }
      next();
    }
  );

  public validatePublishBlogStatus = catchAsync(
    async (
      req: Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      if (req.body.blogPost.isPublished === true) {
        return this.errorUtils.handleAppError(
          "Blog post is already published.",
          400
        );
      }
      next();
    }
  );
}
