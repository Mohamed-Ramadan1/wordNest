import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class addFavoriteItemDto {
  @IsNotEmpty({ message: "Blog post id is required" })
  blogPostId: ObjectId;

  constructor(blogPostId: ObjectId) {
    this.blogPostId = blogPostId;
  }
}
