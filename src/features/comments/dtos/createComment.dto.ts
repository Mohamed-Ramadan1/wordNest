import { IsNotEmpty } from "class-validator";

export class CreateCommentDTO {
  @IsNotEmpty({ message: "Blog id that you will comment at  is required. " })
  blogId: string;

  @IsNotEmpty({ message: "Comment content must not be empty" })
  content: string;

  constructor(blogId: string, content: string) {
    this.blogId = blogId;
    this.content = content;
  }
}
