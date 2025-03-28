import { IsNotEmpty, IsEnum } from "class-validator";
import { ObjectId } from "mongoose";
import { InteractionType } from "../interfaces/interaction.interface";

export class ValidateInteractWithBlogPostDto {
  @IsNotEmpty({ message: "blog post id is required." })
  public blogPostId: ObjectId;

  @IsNotEmpty({ message: "interaction type is required." })
  @IsEnum(InteractionType, { message: "Invalid interaction type" })
  public interactionType: InteractionType;

  constructor(blogPostId: ObjectId, interactionType: InteractionType) {
    this.blogPostId = blogPostId;
    this.interactionType = interactionType;
  }
}
