//express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, TYPES, ApiResponse, IResponseUtils } from "@shared/index";

// interfaces imports
import {
  IBlogStatusService,
  BlogStatusRequestBody,
} from "../../interfaces/index";

@injectable()
export class BlogStatusController {
  constructor(
    @inject(TYPES.BlogStatusService)
    private readonly blogStatusService: IBlogStatusService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
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

      this.responseUtils.sendResponse(200, res, response);
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

      this.responseUtils.sendResponse(200, res, response);
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

      this.responseUtils.sendResponse(200, res, response);
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

      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
