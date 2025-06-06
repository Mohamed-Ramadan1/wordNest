//express imports
import { Response, Request } from "express";

// package imports
import { injectable, inject } from "inversify";
// interface imports

// shared interface imports
import { ApiResponse, TYPES, catchAsync, IResponseUtils } from "@shared/index";

// services imports
import {
  IInteraction,
  IInteractionsService,
  InteractionsRequestParams,
  CRUDInteractionsReqBody,
} from "../interfaces/index";

// interface imports
import {
  CreateInteractionRequestBody,
  UpdateInteractionRequestBody,
} from "../interfaces/interactionsRequest.interface";

@injectable()
export class InteractionsController {
  constructor(
    @inject(TYPES.InteractionService)
    private readonly interactionService: IInteractionsService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
  /**
   * Handles the logic for interacting with a blog post.
   * This includes liking, disliking, or any other form of engagement.
   */
  public interactWithBlogPost = catchAsync(
    async (
      req: Request<{}, {}, CreateInteractionRequestBody>,
      res: Response
    ) => {
      await this.interactionService.interactWithBlogPost(
        req.body.newInteractionData
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Successfully interacted with blog post.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Handles the logic for deleting the user's interaction with a blog post.
   * This removes any previous likes, dislikes, or engagements.
   */
  public deleteMyInteractionWithBlogPost = catchAsync(
    async (req: Request<InteractionsRequestParams>, res: Response) => {
      await this.interactionService.deleteMyInteractionWithBlogPost(
        req.params.interactionId,
        req.user._id
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Interaction with blog post deleted successfully.",
      };
      this.responseUtils.sendResponse(204, res, response);
    }
  );

  /**
   * Handles the logic for updating the user's interaction with a blog post.
   * This allows users to change their previous interaction (e.g., changing a like to a dislike).
   */
  public updateMyInteractionWithBlogPost = catchAsync(
    async (
      req: Request<{}, {}, UpdateInteractionRequestBody>,
      res: Response
    ) => {
      await this.interactionService.updateMyInteractionWithBlogPost(
        req.body.interaction,
        req.body.interactionType
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Interaction with blog post updated successfully.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Retrieves all interactions associated with a specific blog post.
   * This includes likes, dislikes, and other engagement metrics.
   */
  public getAllInteractionsWithBlogPost = catchAsync(
    async (req: Request<{}, {}, CRUDInteractionsReqBody>, res: Response) => {
      const blogPostInteractions: IInteraction[] =
        await this.interactionService.getAllInteractionsWithBlogPost(
          req.body.blogPostId,
          req.query
        );
      const response: ApiResponse<IInteraction[]> = {
        status: "success",
        message: "Interactions with blog post retrieved successfully.",
        results: blogPostInteractions.length,
        data: {
          interactions: blogPostInteractions,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
