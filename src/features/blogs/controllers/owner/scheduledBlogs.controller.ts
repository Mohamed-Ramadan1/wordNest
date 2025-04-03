//express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, TYPES, ApiResponse, IResponseUtils } from "@shared/index";

// interfaces imports
import {
  CreateScheduleBlogsRequestBody,
  ScheduleBlogsParams,
  RescheduleBlogRequestBody,
  UpdateScheduleBlogBodyRequestBody,
  IBlog,
} from "../../interfaces/index";

import { IScheduledBlogsService } from "../../interfaces/index";

@injectable()
export class ScheduledBlogsController {
  constructor(
    @inject(TYPES.ScheduledBlogsService)
    private readonly scheduledBlogsService: IScheduledBlogsService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  /**
   * Creates a new scheduled blog post.
   * Handles the request to add a blog post that will be published at a later date.
   */
  public createScheduledBlogPost = catchAsync(
    async (
      req: Request<{}, {}, CreateScheduleBlogsRequestBody>,
      res: Response
    ) => {
      await this.scheduledBlogsService.createScheduledBlogPost(
        req.body.blogData
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Scheduled blog post created successfully",
      };
      this.responseUtils.sendResponse(201, res, response);
    }
  );

  /**
   * Updates an existing scheduled blog post.
   * Processes the request to modify the content, title, scheduled time, or other details.
   */
  public updateScheduledBlogPost = catchAsync(
    async (
      req: Request<{}, {}, UpdateScheduleBlogBodyRequestBody>,
      res: Response
    ) => {
      await this.scheduledBlogsService.updateScheduledBlogPost(
        req.body,
        req.user
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Scheduled blog post updated successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Deletes a scheduled blog post.
   * Handles the request to remove a scheduled blog post permanently before its publication.
   */
  public deleteScheduledBlogPost = catchAsync(
    async (req: Request<ScheduleBlogsParams>, res: Response) => {
      await this.scheduledBlogsService.deleteScheduledBlogPost(
        req.params.blogId,
        req.user
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Scheduled blog post deleted successfully",
      };
      this.responseUtils.sendResponse(204, res, response);
    }
  );

  /**
   * Retrieves all scheduled blog posts.
   * Fetches a list of all blog posts that are scheduled for future publication.
   */
  public getAllScheduledBlogPosts = catchAsync(
    async (req: Request, res: Response) => {
      const scheduledBlogPosts =
        await this.scheduledBlogsService.getAllScheduledBlogPosts(
          req.user,
          req
        );
      const response: ApiResponse<IBlog[]> = {
        status: "success",
        message: "Scheduled blog posts retrieved successfully",
        results: scheduledBlogPosts.length,
        data: {
          scheduledPosts: scheduledBlogPosts,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves a single scheduled blog post.
   * Fetches a specific scheduled blog post by its ID for viewing or editing.
   */
  public getScheduledBlogPost = catchAsync(
    async (req: Request<ScheduleBlogsParams>, res: Response) => {
      const scheduledBlogPost =
        await this.scheduledBlogsService.getScheduledBlogPost(
          req.params.blogId,
          req.user
        );
      const response: ApiResponse<IBlog> = {
        status: "success",
        message: "Scheduled blog post retrieved successfully",
        data: {
          scheduledPost: scheduledBlogPost,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Reschedules a blog post.
   * Allows updating the scheduled time of an existing scheduled blog post.
   */
  public rescheduleBlogPost = catchAsync(
    async (req: Request<{}, {}, RescheduleBlogRequestBody>, res: Response) => {
      await this.scheduledBlogsService.rescheduleBlogPost(
        req.body.blog,
        req.body.rescheduleFormatDate
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Scheduled blog post rescheduled successfully",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
