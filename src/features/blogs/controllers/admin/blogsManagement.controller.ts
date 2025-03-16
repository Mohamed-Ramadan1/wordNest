//express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shared interface imports
import { ApiResponse, catchAsync, sendResponse, TYPES } from "@shared/index";

// interfaces imports
import {
  BlogsManagementRequestParams,
  BlogManagementRequestBody,
  IBlog,
  IBlogManagementService,
} from "../../interfaces/index";

@injectable()
export class BlogManagementController {
  private blogManagementService: IBlogManagementService;
  constructor(
    @inject(TYPES.BlogManagementService)
    blogManagementService: IBlogManagementService
  ) {
    this.blogManagementService = blogManagementService;
  }
  /**
   * Deletes a blog post.
   * Handles the request to remove a specified blog post permanently from the system.
   */
  public deleteBlogPost = catchAsync(
    async (req: Request<{}, {}, BlogManagementRequestBody>, res: Response) => {
      const { blogOwner, blogPost, userAdmin } = req.body;
      await this.blogManagementService.deleteBlogPost(
        blogOwner,
        blogPost,
        userAdmin
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post deleted successfully",
      };
      sendResponse(204, res, response);
    }
  );

  /**
   * Retrieves a single blog post.
   * Fetches a specific blog post by its ID for viewing or editing.
   */
  public getBlogPost = catchAsync(
    async (req: Request<BlogsManagementRequestParams>, res: Response) => {
      const blogPost = await this.blogManagementService.getBlogPost(
        req.params.blogId
      );
      const response: ApiResponse<IBlog> = {
        status: "success",
        message: "Blog post retrieved successfully",
        data: {
          blog: blogPost,
        },
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves all blog posts.
   * Fetches a list of all blog posts available in the system.
   */
  public getAllBlogPosts = catchAsync(async (req: Request, res: Response) => {
    const blogsData = await this.blogManagementService.getAllBlogPosts(req);
    const response: ApiResponse<IBlog[]> = {
      status: "success",
      message: "Blog post retrieved successfully",
      results: blogsData.length,
      data: {
        blogs: blogsData,
      },
    };
    sendResponse(200, res, response);
  });

  /**
   * Retrieves all blog posts related to specified user
   * get all blog posts related to specified user to retrieve it and check it
   */
  public getAllBlogPostsByUser = catchAsync(
    async (req: Request<BlogsManagementRequestParams>, res: Response) => {
      const blogsData = await this.blogManagementService.getAllBlogPostsByUser(
        req.params.userId,
        req.query
      );
      const response: ApiResponse<IBlog[]> = {
        status: "success",
        message: "Blog posts retrieved successfully.",
        results: blogsData.length,
        data: {
          blogs: blogsData,
        },
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * un publish a blog post.
   * Handles the request to un publish a specified blog post
   * no longer appear to users  until been reviewed and deleted or republished again .
   */
  public unPublishBlogPost = catchAsync(
    async (req: Request<{}, {}, BlogManagementRequestBody>, res: Response) => {
      const { blogOwner, blogPost, userAdmin } = req.body;
      await this.blogManagementService.unPublishBlogPost(
        blogPost,
        blogOwner,
        userAdmin
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post unpublished successfully",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * republish a blog post.
   * Handles the request to republish a specified blog post
   * that has been previously unpublished and now is available to users to see and interact.
   *
   */
  public rePublishBlogPost = catchAsync(
    async (req: Request<{}, {}, BlogManagementRequestBody>, res: Response) => {
      const { blogOwner, blogPost, userAdmin } = req.body;
      await this.blogManagementService.rePublishBlogPost(
        blogPost,
        blogOwner,
        userAdmin
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post republished successfully.",
      };
      sendResponse(200, res, response);
    }
  );
}
