//express imports
import { Response, Request } from "express";

// package imports
import { injectable, inject } from "inversify";
// interface imports

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// services imports
import { IInteractionsService } from "../interfaces/interactionsService.interface";

// config imports
import { TYPES } from "@config/containerTypes.config";

@injectable()
export class InteractionsController {
  private interactionService: IInteractionsService;
  constructor(
    @inject(TYPES.InteractionService) interactionService: IInteractionsService
  ) {
    this.interactionService = interactionService;
  }
  /**
   * Handles the logic for interacting with a blog post.
   * This includes liking, disliking, or any other form of engagement.
   */
  public interactWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {
      await this.interactionService.interactWithBlogPost();
      const response: ApiResponse<null> = {
        status: "success",
        message: "Successfully interacted with blog post",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Handles the logic for deleting the user's interaction with a blog post.
   * This removes any previous likes, dislikes, or engagements.
   */
  public deleteMyInteractionWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {
      await this.interactionService.deleteMyInteractionWithBlogPost();
      const response: ApiResponse<null> = {
        status: "success",
        message: "Interaction with blog post deleted successfully.",
      };
      sendResponse(204, res, response);
    }
  );

  /**
   * Handles the logic for updating the user's interaction with a blog post.
   * This allows users to change their previous interaction (e.g., changing a like to a dislike).
   */
  public updateMyInteractionWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {
      await this.interactionService.updateMyInteractionWithBlogPost();
      const response: ApiResponse<null> = {
        status: "success",
        message: "Interaction with blog post updated successfully.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves all interactions associated with a specific blog post.
   * This includes likes, dislikes, and other engagement metrics.
   */
  public getAllInteractionsWithBlogPost = catchAsync(
    async (req: Request, res: Response) => {
      await this.interactionService.getAllInteractionsWithBlogPost();
      const response: ApiResponse<null> = {
        status: "success",
        message: "Interactions with blog post retrieved successfully.",
      };
      sendResponse(200, res, response);
    }
  );
}
