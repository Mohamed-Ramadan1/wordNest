//express imports
import { Response, Request, NextFunction } from "express";

// models imports

// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

// interfaces imports

// dto imports
import { validateInteractWithBlogPostDto } from "../dtos/validateInteractWIthPost.dto";

export class InteractionsMiddleware {
  public static validateInteractWithBlogPost = [
    validateDto(validateInteractWithBlogPostDto),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      next();
    }),
  ];
}
