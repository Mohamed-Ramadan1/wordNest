// Packages imports
import { ObjectId } from "mongoose";
import { injectable, inject } from "inversify";
import { ParsedQs } from "qs";
// utils imports
import { IErrorUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IInteractionsService,
  IInteraction,
  InteractionType,
} from "../interfaces/index";
import { InteractionData } from "../interfaces/interactionsRequest.interface";
import { IInteractionsRepository } from "../interfaces/repositoryInterfaces/interactionsRepository.interface";

@injectable()
export class InteractionsService implements IInteractionsService {
  constructor(
    @inject(TYPES.InteractionsRepository)
    private readonly interactionsRepository: IInteractionsRepository,
    @inject(TYPES.ErrorUtils)
    private readonly errorUtils: IErrorUtils
  ) {}

  /**
   * Handles interaction with a blog post, such as liking or disliking.
   */
  public async interactWithBlogPost(
    interactionInfo: InteractionData
  ): Promise<void> {
    try {
      await this.interactionsRepository.createInteraction(interactionInfo);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Deletes the user's interaction with a blog post.
   */
  public async deleteMyInteractionWithBlogPost(
    interactionId: ObjectId,
    userId: ObjectId
  ) {
    try {
      await this.interactionsRepository.deleteInteraction(
        interactionId,
        userId
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  /**
   * Updates the user's interaction with a blog post.
   */
  public async updateMyInteractionWithBlogPost(
    interaction: IInteraction,
    interactionType: InteractionType
  ) {
    try {
      await this.interactionsRepository.updateInteractionType(
        interaction,
        interactionType
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
  /**
   * Retrieves all interactions for a specific blog post.
   */
  public async getAllInteractionsWithBlogPost(
    blogPostId: ObjectId,
    reqQuery: ParsedQs
  ) {
    try {
      const interactions: IInteraction[] =
        await this.interactionsRepository.getInteractionsByBlogPost(
          blogPostId,
          reqQuery
        );
      return interactions;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
