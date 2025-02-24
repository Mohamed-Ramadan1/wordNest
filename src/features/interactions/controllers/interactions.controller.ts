//express imports
import { Response, Request } from "express";

// interface imports

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

export class InteractionsController {
  /**
   * Handles the logic for interacting with a blog post.
   * This includes liking, disliking, or any other form of engagement.
   */
  public interactWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Handles the logic for deleting the user's interaction with a blog post.
   * This removes any previous likes, dislikes, or engagements.
   */
  public deleteMyInteractionWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Handles the logic for updating the user's interaction with a blog post.
   * This allows users to change their previous interaction (e.g., changing a like to a dislike).
   */
  public updateMyInteractionWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Retrieves all interactions associated with a specific blog post.
   * This includes likes, dislikes, and other engagement metrics.
   */
  public getAllInteractionsWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
