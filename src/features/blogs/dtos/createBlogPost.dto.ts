import { IsNotEmpty, MinLength } from "class-validator";
import { BlogCategory } from "../interfaces/blog.interface";

export class CreateBlogPostDTO {
  @IsNotEmpty({ message: "Blog title must not be empty" })
  @MinLength(3, { message: "Blog title must be at least 3 characters long" })
  title: string;

  @IsNotEmpty({ message: "Blog content must not be empty" })
  @MinLength(10, {
    message: "Blog content must be at least 10 characters long",
  })
  content: string;

  @IsNotEmpty({ message: "Blog post must have a category" })
  categories: BlogCategory;

  constructor(
    title: string = "",
    content: string = "",
    categories: BlogCategory
  ) {
    this.title = title;
    this.content = content;
    this.categories = categories;
  }
}
