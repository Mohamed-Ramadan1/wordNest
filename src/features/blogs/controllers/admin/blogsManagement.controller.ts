//express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse, APIFeatures } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// services imports
import { BlogManagementService } from "../../services/admin/blogsManagement.service";

// interfaces imports
import { BlogsManagementRequestParams } from "../../interfaces/blogsManagementRequest.interface";

export class BlogManagementController {
  /**
   * Deletes a blog post.
   * Handles the request to remove a specified blog post permanently from the system.
   */
  public deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
    await BlogManagementService.deleteBlogPost();
    const response: ApiResponse<null> = {
      status: "success",
      message: "Blog post deleted successfully",
    };
    sendResponse(204, res, response);
  });

  /**
   * Retrieves a single blog post.
   * Fetches a specific blog post by its ID for viewing or editing.
   */
  public getBlogPost = catchAsync(async (req: Request, res: Response) => {
    await BlogManagementService.getBlogPost();
    const response: ApiResponse<null> = {
      status: "success",
      message: "Blog post retrieved successfully",
    };
    sendResponse(200, res, response);
  });

  /**
   * Retrieves all blog posts.
   * Fetches a list of all blog posts available in the system.
   */
  public getAllBlogPosts = catchAsync(async (req: Request, res: Response) => {
    await BlogManagementService.getAllBlogPosts();
    const response: ApiResponse<null> = {
      status: "success",
      message: "Blog post retrieved successfully",
    };
    sendResponse(200, res, response);
  });

  /**
   * Retrieves all blog posts related to specified user
   * get all blog posts related to specified user to retrieve it and check it
   */
  public getAllBlogPostsByUser = catchAsync(
    async (req: Request<BlogsManagementRequestParams>, res: Response) => {
      await BlogManagementService.getAllBlogPostsByUser(
        req.params.userId,
        req.query
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog posts retrieved successfully.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * un publish a blog post.
   * Handles the request to un publish a specified blog post
   * no longer appear to users  until been reviewed and deleted or republished again .
   */
  public unPublishBlogPost = catchAsync(async (req: Request, res: Response) => {
    await BlogManagementService.unPublishBlogPost();
    const response: ApiResponse<null> = {
      status: "success",
      message: "Blog post unpublished successfully",
    };
    sendResponse(200, res, response);
  });

  /**
   * republish a blog post.
   * Handles the request to republish a specified blog post
   * that has been previously unpublished and now is available to users to see and interact.
   *
   */
  public rePublishBlogPost = catchAsync(async (req: Request, res: Response) => {
    await BlogManagementService.rePublishBlogPost();
    const response: ApiResponse<null> = {
      status: "success",
      message: "Blog post republished successfully.",
    };
    sendResponse(200, res, response);
  });
}
