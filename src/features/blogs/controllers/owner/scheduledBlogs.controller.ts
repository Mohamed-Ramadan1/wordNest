//express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// services imports
import { ScheduledBlogsService } from "../../services/owner/scheduledBlogs.service";

// interfaces imports
import { ScheduleBlogsParams } from "../../interfaces/scheduledBlogsRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
export class ScheduledBlogsController {
  /**
   * Creates a new scheduled blog post.
   * Handles the request to add a blog post that will be published at a later date.
   */
  public createScheduledBlogPost = catchAsync(
    async (req: Request, res: Response) => {
      await ScheduledBlogsService.createScheduledBlogPost();
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
    async (req: Request, res: Response) => {
      await ScheduledBlogsService.updateScheduledBlogPost();
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
      await ScheduledBlogsService.deleteScheduledBlogPost(
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
        await ScheduledBlogsService.getAllScheduledBlogPosts(req.user, req);
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
        await ScheduledBlogsService.getScheduledBlogPost(
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
    async (req: Request, res: Response) => {
      await ScheduledBlogsService.rescheduleBlogPost();
      const response: ApiResponse<null> = {
        status: "success",
        message: "Scheduled blog post rescheduled successfully",
      };
      sendResponse(200, res, response);
    }
  );
}
