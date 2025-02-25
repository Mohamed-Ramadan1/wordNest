import { ObjectId } from "mongoose";
import { InteractionType } from "./interaction.interface";

export interface InteractionData {
  interactionType: InteractionType;
  user: ObjectId;
  blogPost: ObjectId;
  interactedAt?: Date;
}

export interface CreateInteractionRequestBody {
  interactionType: InteractionType;
  userId: ObjectId;
  blogPostId: ObjectId;
  newInteractionData: InteractionData;
}

export interface InteractionsRequestParams {
  interactionId: ObjectId;
}
