import { IsNotEmpty, IsEnum } from "class-validator";
import { InteractionType } from "../interfaces/interaction.interface";

export class UpdateInteractionDTO {
  @IsNotEmpty({ message: "interaction type is required." })
  @IsEnum(InteractionType, { message: "Invalid interaction type" })
  public interactionType: InteractionType;

  constructor(interactionType: InteractionType) {
    this.interactionType = interactionType;
  }
}
