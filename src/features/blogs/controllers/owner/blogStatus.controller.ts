//express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// interfaces imports
import { BlogStatusRequestBody } from "../../interfaces/blogStatusRequest.interface";
// services imports
import { BlogStatusService } from "../../services/owner/blogStatus.service";
export class BlogStatusController {
  /**
   * Converts a blog post to private.
   */
  public convertBlogToPrivate = catchAsync(
    async (req: Request<{}, {}, BlogStatusRequestBody>, res: Response) => {
      await BlogStatusService.convertBlogToPrivate(req.body.blogPost);
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
      await BlogStatusService.convertBlogToPublic(req.body.blogPost);
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
      await BlogStatusService.archiveBlogPost(req.body.blogPost);
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
      await BlogStatusService.unArchiveBlogPost(req.body.blogPost);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post un-archived successfully.",
      };

      sendResponse(200, res, response);
    }
  );
}
