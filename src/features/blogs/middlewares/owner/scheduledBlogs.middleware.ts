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
  validateScheduleDateFormatRequestBody,
  CreateScheduleBlogsRequestBody,
  BlogData,
  ScheduleBlogsParams,
  RescheduleBlogRequestBody,
  UpdateScheduleBlogBodyRequestBody,
} from "@features/blogs/interfaces/scheduledBlogsRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import BlogModel from "@features/blogs/models/blog.model";
export class ScheduledBlogsMiddleware {
  public static validateScheduleDateFormat = catchAsync(
    async (
      req: Request<{}, {}, validateScheduleDateFormatRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { scheduledFor } = req.body;

      // check existing of scheduled  for data
      if (!scheduledFor) {
        return next(
          new AppError(
            "You have to define the date that the blog post will be published at.",
            400
          )
        );
      }
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
      req.body.parsedDate = parsedDate;

      next();
    }
  );

  public static validateCreateScheduledBlogPost = [
    validateDto(CreateBlogPostDTO),
    catchAsync(
      async (
        req: Request<
          {},
          {},
          CreateScheduleBlogsRequestBody & validateScheduleDateFormatRequestBody
        >,
        res: Response,
        next: NextFunction
      ) => {
        const { title, content, categories, scheduledFor, parsedDate } =
          req.body;

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

  public static validateRescheduleBlogPost = catchAsync(
    async (
      req: Request<
        ScheduleBlogsParams,
        {},
        RescheduleBlogRequestBody & validateScheduleDateFormatRequestBody
      >,
      res: Response,
      next: NextFunction
    ) => {
      const blogPost: IBlog | null = await BlogModel.findOne({
        _id: req.params.blogId,
        author: req.user._id,
        isScheduled: true,
      });
      if (!blogPost) {
        return next(
          new AppError(
            "Blog not found with given id and related to this user, or blog is not scheduled.",
            404
          )
        );
      }
      req.body.blog = blogPost;
      req.body.rescheduleFormatDate = req.body.parsedDate;
      next();
    }
  );

  public static validateUpdateScheduledBlogPost = catchAsync(
    async (
      req: Request<ScheduleBlogsParams, {}, UpdateScheduleBlogBodyRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const blogPost: IBlog | null = await BlogModel.findOne({
        _id: req.params.blogId,
        author: req.user._id,
        isScheduled: true,
      });
      if (!blogPost) {
        return next(
          new AppError(
            "Blog not found with given id and related to this user.or is not a scheduled blog post.",
            404
          )
        );
      }
      req.body.blog = blogPost;
      next();
    }
  );
}
