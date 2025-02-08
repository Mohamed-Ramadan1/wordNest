//express imports
import { Response, Request, NextFunction } from "express";

// utils imports
import { catchAsync } from "@utils/index";

export class BlogOwnerCRUDMiddleware {
  public static validateCreateBlogPost = catchAsync(
    (req: Request, res: Response, next: NextFunction) => {}
  );
}
