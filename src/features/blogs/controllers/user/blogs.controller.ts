//express imports
import { Response, Request } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { catchAsync, sendResponse, TYPES, ApiResponse } from "@shared/index";

// interfaces imports
import { BlogsRequestParams } from "../../interfaces/blogsRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { IBlogsService } from "../../interfaces/index";
@injectable()
export class BlogsController {
  private blogsService: IBlogsService;
  constructor(@inject(TYPES.BlogsService) blogsService: IBlogsService) {
    this.blogsService = blogsService;
  }
  /**
   * Retrieves a single blog post.
   * Fetches a specific blog post by its ID for viewing or editing.
   */
  public getBlogPost = catchAsync(
    async (req: Request<BlogsRequestParams>, res: Response) => {
      const blogPost = await this.blogsService.getBlogPost(req.params.blogId);
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
    const blogsData = await this.blogsService.getAllBlogPosts(req.query);
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
    async (req: Request<BlogsRequestParams>, res: Response) => {
      const blogsData = await this.blogsService.getAllBlogPostsByUser(
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
}
