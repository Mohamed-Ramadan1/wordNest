// packages imports
import { inject, injectable } from "inversify";
import { ClientSession, Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";
// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

// Interface imports
import { IBlog } from "@features/blogs/interfaces";
import {
  IInteraction,
  IInteractionsRepository,
  InteractionData,
  InteractionType,
} from "../interfaces/index";

@injectable()
export class InteractionsRepository implements IInteractionsRepository {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.InteractionsModel)
    private readonly interactionModel: Model<IInteraction>,
    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IInteraction[], IInteraction>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IInteraction>
  ) {}

  async getInteractionByIdAndUser(
    interactionId: ObjectId,
    userId: ObjectId
  ): Promise<IInteraction> {
    try {
      const interaction: IInteraction | null =
        await this.interactionModel.findOne({
          _id: interactionId,
          user: userId,
        });
      if (!interaction) {
        throw new Error("Interaction not found");
      }
      return interaction;
    } catch (error: any) {
      throw new Error(`Error fetching interaction by ID: ${error.message}`);
    }
  }

  async createInteraction(data: InteractionData): Promise<void> {
    const session: ClientSession = await this.interactionModel.startSession();
    try {
      session.startTransaction();

      await this.interactionModel.create([data], { session });

      await this.blogModel.findByIdAndUpdate(
        data.blogPost,
        { $inc: { interActionsCount: 1 } },
        { session }
      );
      await session.commitTransaction();
    } catch (error: any) {
      await session.abortTransaction();
      throw new Error(`Error creating interaction: ${error.message}`);
    } finally {
      session.endSession();
    }
  }

  async deleteInteraction(
    interactionId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    const session: ClientSession = await this.interactionModel.startSession();

    try {
      session.startTransaction();

      const interaction: IInteraction | null =
        await this.interactionModel.findOneAndDelete({
          _id: interactionId,
          user: userId,
        });
      if (!interaction) {
        throw new Error("Interaction not found");
      }

      await this.blogModel.findOneAndUpdate(
        { _id: interaction?.blogPost },
        { $inc: { interActionsCount: -1 } },
        { session }
      );
      await session.commitTransaction();
      // await this.blogModel.updateOne();
    } catch (error: any) {
      await session.abortTransaction();
      throw new Error(`Error deleting interaction: ${error.message}`);
    } finally {
      session.endSession();
    }
  }

  async updateInteractionType(
    interaction: IInteraction,
    interactionType: InteractionType
  ): Promise<void> {
    try {
      interaction.type = interactionType;
      interaction.interactedAt = new Date();
      await interaction.save();
    } catch (error: any) {
      throw new Error(`Error updating interaction: ${error.message}`);
    }
  }

  async getInteractionsByBlogPost(
    blogPostId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IInteraction[]> {
    try {
      const features = this.apiFeatures(
        this.interactionModel.find({
          blogPost: blogPostId,
        }),
        reqQuery
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const interactions: IInteraction[] = await features.execute();
      return interactions;
    } catch (error: any) {
      throw new Error(
        `Error fetching interactions by blog post: ${error.message}`
      );
    }
  }

  async getInteractionsByUser(userId: ObjectId): Promise<any[]> {
    try {
      return await this.interactionModel.find({ user: userId });
    } catch (error: any) {
      throw new Error(`Error fetching interactions by user: ${error.message}`);
    }
  }

  async getUserInteractionWithBlogPost(
    userId: ObjectId,
    blogPostId: ObjectId
  ): Promise<any | null> {
    try {
      return await this.interactionModel.findOne({
        user: userId,
        blogPost: blogPostId,
      });
    } catch (error: any) {
      throw new Error(
        `Error fetching user interaction with blog post: ${error.message}`
      );
    }
  }
}
