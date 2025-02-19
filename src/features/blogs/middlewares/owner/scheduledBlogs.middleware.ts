//express imports
import { Response, Request, NextFunction } from "express";
// packages imports
import { isValid, parse } from "date-fns";
// utils imports
import {
  catchAsync,
  validateDto,
  AppError,
  uploadImagesToCloudinary,
} from "@utils/index";

// dtos imports
import { CreateBlogPostDTO } from "@features/blogs/dtos/createBlogPost.dto";

// helpers imports (feature specific)
import { filterValidImages } from "@features/blogs/helpers/filterValidImages";

// interfaces imports
import {
  CreateScheduleBlogsRequestBody,
  BlogData,
} from "@features/blogs/interfaces/scheduledBlogsRequest.interface";
export class ScheduledBlogsMiddleware {
  public static validateCreateScheduledBlogPost = [
    validateDto(CreateBlogPostDTO),
    catchAsync(
      async (
        req: Request<{}, {}, CreateScheduleBlogsRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        // check existing of scheduled  for data
        if (!req.body.scheduledFor) {
          return next(
            new AppError(
              "You have to define the date that the blog post will be published at.",
              400
            )
          );
        }
        const { title, content, categories, scheduledFor } = req.body;

        // Convert '21/10/2025 14:30' (DD/MM/YYYY HH:mm) to a valid Date object
        const parsedDate = parse(scheduledFor, "dd/MM/yyyy HH:mm", new Date());

        if (!isValid(parsedDate)) {
          return next(
            new AppError("Invalid date format. Use DD/MM/YYYY HH:mm.", 400)
          );
        }

        // Ensure the scheduled date is in the future
        const now = new Date();
        if (parsedDate < now) {
          return next(
            new AppError("Scheduled date should be in the future.", 400)
          );
        }

        // Normalize the date to remove seconds & milliseconds
        parsedDate.setSeconds(0, 0);

        const blogReadyData: BlogData = {
          title,
          content,
          categories,
          author: req.user,
          scheduledFor: parsedDate, // Now includes only hours and minutes
          tags: req.body.tags || [],
        };

        if (req.files) {
          const blogImages = filterValidImages(req.files);

          const imagesData = await uploadImagesToCloudinary(
            blogImages,
            "blogImages",
            "blogs-images"
          );

          blogReadyData.uploadedImages = imagesData;
        }

        req.body.blogData = blogReadyData;
        next();
      }
    ),
  ];
}
