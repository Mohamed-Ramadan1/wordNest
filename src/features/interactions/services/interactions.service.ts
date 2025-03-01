// Packages imports
import { ObjectId } from "mongoose";
import { injectable, inject } from "inversify";

// model imports
import { InteractionModel } from "../models/interactions.model";

// utils imports
import { APIFeatures, AppError, handleServiceError } from "@utils/index";

// config imports
import { TYPES } from "@config/containerTypes.config";

// interfaces imports
import { IInteractionsService } from "../interfaces/interactionsService.interface";
import { IInteraction } from "../interfaces/interaction.interface";
import { InteractionData } from "../interfaces/interactionsRequest.interface";
import { IInteractionsRepository } from "../interfaces/InteractionsRepository.interface";
@injectable()
export class InteractionsService implements IInteractionsService {
  private interactionsRepository: IInteractionsRepository;

  constructor(
    @inject(TYPES.InteractionsRepository)
    interactionsRepository: IInteractionsRepository
  ) {
    this.interactionsRepository = interactionsRepository;
  }

  /**
   * Handles interaction with a blog post, such as liking or disliking.
   */
  public async interactWithBlogPost(
    interactionInfo: InteractionData
  ): Promise<void> {
    try {
      await this.interactionsRepository.createInteraction(interactionInfo);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Deletes the user's interaction with a blog post.
   */
  public async deleteMyInteractionWithBlogPost() {
    try {
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  /**
   * Updates the user's interaction with a blog post.
   */
  public async updateMyInteractionWithBlogPost() {
    try {
    } catch (err: any) {
      handleServiceError(err);
    }
  }
  /**
   * Retrieves all interactions for a specific blog post.
   */
  public async getAllInteractionsWithBlogPost() {
    try {
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
