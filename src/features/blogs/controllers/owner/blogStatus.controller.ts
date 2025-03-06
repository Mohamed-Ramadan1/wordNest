//express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, sendResponse, TYPES, ApiResponse } from "@shared/index";

// interfaces imports
import { BlogStatusRequestBody } from "../../interfaces/blogStatusRequest.interface";

import { IBlogStatusService } from "../../interfaces/index";

@injectable()
export class BlogStatusController {
  private blogStatusService: IBlogStatusService;
  constructor(
    @inject(TYPES.BlogStatusService)
    blogStatusService: IBlogStatusService
  ) {
    this.blogStatusService = blogStatusService;
  }
  /**
   * Converts a blog post to private.
   */
  public convertBlogToPrivate = catchAsync(
    async (req: Request<{}, {}, BlogStatusRequestBody>, res: Response) => {
      await this.blogStatusService.convertBlogToPrivate(req.body.blogPost);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post converted to private successfully.",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Converts a blog post to public.
   */
  public convertBlogToPublic = catchAsync(
    async (req: Request<{}, {}, BlogStatusRequestBody>, res: Response) => {
      await this.blogStatusService.convertBlogToPublic(req.body.blogPost);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post converted to public successfully.",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Archives a blog post instead of deleting it.
   */
  public archiveBlogPost = catchAsync(
    async (req: Request<{}, {}, BlogStatusRequestBody>, res: Response) => {
      await this.blogStatusService.archiveBlogPost(req.body.blogPost);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post archived successfully.",
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Restores an archived blog post back to active status.
   */

  public restoreArchivedBlogPost = catchAsync(
    async (req: Request<{}, {}, BlogStatusRequestBody>, res: Response) => {
      await this.blogStatusService.unArchiveBlogPost(req.body.blogPost);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post un-archived successfully.",
      };

      sendResponse(200, res, response);
    }
  );
}
