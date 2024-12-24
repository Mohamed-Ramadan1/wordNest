import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export class userMiddleware {
  static validateUpdateUserProfilePicture = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file || !req.file.mimetype.startsWith("image/")) {
        return next(new AppError("Please provide a image", 400));
      }
      next();
    }
  );
}
