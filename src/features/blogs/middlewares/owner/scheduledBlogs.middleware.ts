//express imports
import { Response, Request, NextFunction } from "express";

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

        const blogReadyData: BlogData = {
          title,
          content,
          categories,
          author: req.user,
          scheduledFor,
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
