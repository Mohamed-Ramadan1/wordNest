//express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { TYPES } from "@shared/types/containerTypes";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import {
  CreateScheduleBlogsRequestBody,
  ScheduleBlogsParams,
  RescheduleBlogRequestBody,
  UpdateScheduleBlogBodyRequestBody,
} from "../../interfaces/scheduledBlogsRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

import { IScheduledBlogsService } from "../../interfaces/index";

@injectable()
export class ScheduledBlogsController {
  private scheduledBlogsService: IScheduledBlogsService;
  constructor(
    @inject(TYPES.ScheduledBlogsService)
    scheduledBlogsService: IScheduledBlogsService
  ) {
    this.scheduledBlogsService = scheduledBlogsService;
  }

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
      sendResponse(201, res, response);
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
      sendResponse(200, res, response);
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
      sendResponse(204, res, response);
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
      sendResponse(200, res, response);
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
      sendResponse(200, res, response);
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
      sendResponse(200, res, response);
    }
  );
}
