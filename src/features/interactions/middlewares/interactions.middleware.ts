// packages imports
import { inject, injectable } from "inversify";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import { AppError, catchAsync, validateDto } from "@shared/index";

// interfaces imports
import {
  CreateInteractionRequestBody,
  InteractionData,
} from "../interfaces/index";
// dto imports
import { validateInteractWithBlogPostDto } from "../dtos/validateInteractWIthPost.dto";

// models imports
import BlogModel from "@features/blogs/models/blog.model";
import { IBlog } from "@features/blogs/interfaces";

@injectable()
export class InteractionsMiddleware {
  constructor() {}
  public static validateInteractWithBlogPost = [
    validateDto(validateInteractWithBlogPostDto),
    catchAsync(
      async (
        req: Request<{}, {}, CreateInteractionRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { interactionType, blogPostId } = req.body;

        // check if the blog post already exists
        const blogPost: IBlog | null = await BlogModel.findById(blogPostId);
        if (!blogPost) {
          return next(new AppError("No blog post found with that ID", 404));
        }
        const interactionInfo: InteractionData = {
          type: interactionType,
          user: req.user._id,
          blogPost: blogPost._id,
          interactedAt: new Date(),
        };

        req.body.newInteractionData = interactionInfo;
        next();
      }
    ),
  ];
}
