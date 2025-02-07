//express imports
import { Response, Request } from "express";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// service  imports
import { BlogCRUDService } from "../../services/owner/blogOwnerCRUD.service";
export class BlogCRUDController {
  /**
   * Creates a new blog post.
   * Handles the request to add a new post with the provided content.
   */
  public createBlogPost = catchAsync(async (req: Request, res: Response) => {});

  /**
   * Updates an existing blog post.
   * Processes the request to modify the content, title, or other details of an existing post.
   */
  public updateBlogPost = catchAsync(async (req: Request, res: Response) => {});

  /**
   * Deletes a blog post.
   * Handles the request to remove a specified blog post permanently from the system.
   */
  public deleteBlogPost = catchAsync(async (req: Request, res: Response) => {});

  /**
   * Retrieves a single blog post.
   * Fetches a specific blog post by its ID for viewing or editing.
   */
  public getBlogPost = catchAsync(async (req: Request, res: Response) => {});

  /**
   * Retrieves all blog posts.
   * Fetches a list of all blog posts available in the system.
   */
  public getAllBlogPosts = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
