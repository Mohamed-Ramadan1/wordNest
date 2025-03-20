//express imports
import { Response, Request, NextFunction } from "express";

// models imports

// shard imports
import { catchAsync, validateDto } from "@shared/index";

// interfaces imports
import {
  CreateInteractionRequestBody,
  InteractionData,
} from "../interfaces/interactionsRequest.interface";
// dto imports
import { validateInteractWithBlogPostDto } from "../dtos/validateInteractWIthPost.dto";

export class InteractionsMiddleware {
  public static validateInteractWithBlogPost = [
    validateDto(validateInteractWithBlogPostDto),
    catchAsync(
      async (
        req: Request<{}, {}, CreateInteractionRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { interactionType, blogPostId } = req.body;

        const interactionInfo: InteractionData = {
          type: interactionType,
          user: req.user._id,
          blogPost: blogPostId,
          interactedAt: new Date(),
        };

        req.body.newInteractionData = interactionInfo;
        next();
      }
    ),
  ];
}
