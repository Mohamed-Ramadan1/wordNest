//express imports
import { Response, Request, NextFunction } from "express";

// models imports
import BlogModel from "@features/blogs/models/blog.model";

// utils imports
import { catchAsync, AppError } from "@utils/index";

// interfaces imports
import {
  BlogManagementRequestBody,
  BlogsManagementRequestParams,
} from "../../interfaces/blogsManagementRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IUser, UserModel } from "@features/users";
import { blogQueue, BlogsQueueJobs } from "@jobs/index";
export class BlogsManagementMiddleware {
  public static validateBlogPostManagementRequest = catchAsync(
    async (
      req: Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const blog: IBlog | null = await BlogModel.findById(req.params.blogId);
      if (!blog) {
        throw new AppError("Blog post not found with provided id.", 404);
      }

      const blogAuthor: IUser | null = await UserModel.findById(blog.author);
      if (!blogAuthor) {
        blogQueue.add(BlogsQueueJobs.DeleteBlog, {
          blog: blog,
        });
        throw new AppError("Blog author not found.", 404);
      }
      req.body.blogOwner = blogAuthor;
      req.body.blogPost = blog;
      req.body.userAdmin = req.user;
      next();
    }
  );

  public static validateUnPublishBlogStatus = catchAsync(
    async (
      req: Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      if (req.body.blogPost.isPublished === false) {
        throw new AppError("Blog post is already unpublished.", 400);
      }
      next();
    }
  );

  public static validatePublishBlogStatus = catchAsync(
    async (
      req: Request<BlogsManagementRequestParams, {}, BlogManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      if (req.body.blogPost.isPublished === true) {
        throw new AppError("Blog post is already published.", 400);
      }
      next();
    }
  );
}
