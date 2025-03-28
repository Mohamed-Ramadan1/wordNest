// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import { AppError, catchAsync, validateDto, TYPES } from "@shared/index";

// interfaces imports
import {
  CreateInteractionRequestBody,
  IInteraction,
  InteractionData,
  InteractionsRequestParams,
  UpdateInteractionRequestBody,
  IInteractionsMiddleware,
  IInteractionsRepository,
} from "../interfaces/index";
// dto imports
import { ValidateInteractWithBlogPostDto } from "../dtos/validateInteractWIthPost.dto";
import { UpdateInteractionDTO } from "../dtos/updateInteraction.dto";
// models imports

import { IBlog } from "@features/blogs/interfaces";

@injectable()
export class InteractionsMiddleware implements IInteractionsMiddleware {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.InteractionsModel)
    private readonly interactionModel: Model<IInteraction>,
    @inject(TYPES.InteractionsRepository)
    private readonly interactionsRepository: IInteractionsRepository
  ) {}
  public validateInteractWithBlogPost = [
    validateDto(ValidateInteractWithBlogPostDto),
    catchAsync(
      async (
        req: Request<{}, {}, CreateInteractionRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { interactionType, blogPostId } = req.body;

        // check if the blog post already exists
        const blogPost: IBlog | null =
          await this.blogModel.findById(blogPostId);
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
  public validateUpdateInteraction = [
    validateDto(UpdateInteractionDTO),
    catchAsync(
      async (
        req: Request<
          InteractionsRequestParams,
          {},
          UpdateInteractionRequestBody
        >,
        res: Response,
        next: NextFunction
      ) => {
        const { interactionType } = req.body;

        const interaction: IInteraction =
          await this.interactionsRepository.getInteractionByIdAndUser(
            req.params.interactionId,
            req.user._id
          );

        if (interaction.type === interactionType) {
          return next(new AppError("You already have this interaction", 400));
        }

        req.body.interaction = interaction;
        next();
      }
    ),
  ];
}
