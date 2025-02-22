import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateReadingListItemDto {
  @IsNotEmpty({ message: "blog post id is required." })
  public blogPostId: ObjectId;
  constructor(blogPostId: ObjectId) {
    this.blogPostId = blogPostId;
  }
}
