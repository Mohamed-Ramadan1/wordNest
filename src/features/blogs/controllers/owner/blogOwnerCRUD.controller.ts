//express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// service  imports
import { BlogCRUDService } from "../../services/owner/blogOwnerCRUD.service";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import {
  BlogParams,
  CreateBlogBodyRequest,
  DeleteBlogBodyRequest,
} from "@features/blogs/interfaces/blogOwnerRequest.interface";
export class BlogCRUDController {
  /**
   * Creates a new blog post.
   * Handles the request to add a new post with the provided content.
   */
  public createBlogPost = catchAsync(
    async (req: Request<{}, {}, CreateBlogBodyRequest>, res: Response) => {
      await BlogCRUDService.createBlogPost(req.body.blogData, req.user);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post created successfully",
      };
      sendResponse(201, res, response);
    }
  );

  /**
   * Updates an existing blog post.
   * Processes the request to modify the content, title, or other details of an existing post.
   */
  public updateBlogPost = catchAsync(async (req: Request, res: Response) => {
    await BlogCRUDService.updateBlogPost();
    const response: ApiResponse<null> = {
      status: "success",
      message: "Blog post updated successfully",
    };
    sendResponse(200, res, response);
  });

  /**
   * Deletes a blog post.
   * Handles the request to remove a specified blog post permanently from the system.
   */
  public deleteBlogPost = catchAsync(
    async (req: Request<{}, {}, DeleteBlogBodyRequest>, res: Response) => {
      await BlogCRUDService.deleteBlogPost(req.body.blogToBeDeleted, req.user);
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
    async (req: Request<BlogParams>, res: Response) => {
      const blogPost = await BlogCRUDService.getBlogPost(
        req.params.blogId,
        req.user
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
    const blogPosts = await BlogCRUDService.getAllBlogPosts();
    const response: ApiResponse<IBlog[]> = {
      status: "success",
      message: "Blog posts retrieved successfully",
      data: {
        blogs: blogPosts,
      },
    };
    sendResponse(200, res, response);
  });
}
