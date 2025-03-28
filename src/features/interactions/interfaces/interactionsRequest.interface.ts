import { ObjectId } from "mongoose";
import { IInteraction, InteractionType } from "./interaction.interface";

export interface InteractionData {
  type: InteractionType;
  user: ObjectId;
  blogPost: ObjectId;
  interactedAt?: Date;
}

export interface CreateInteractionRequestBody {
  interactionType: InteractionType;
  blogPostId: ObjectId;
  newInteractionData: InteractionData;
}

export interface UpdateInteractionRequestBody {
  interactionType: InteractionType;
  interaction: IInteraction;
}
export interface CRUDInteractionsReqBody {
  blogPostId: ObjectId;
}
export interface InteractionsRequestParams {
  interactionId: ObjectId;
}
