// packages imports
import { inject, injectable } from "inversify";
import { isValid, parse } from "date-fns";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import {
  catchAsync,
  validateDto,
  AppError,
  uploadImagesToCloudinary,
  TYPES,
} from "@shared/index";

// dtos imports
import { CreateBlogPostDTO } from "@features/blogs/dtos/createBlogPost.dto";

// helpers imports (feature specific)
import { filterValidImages } from "@features/blogs/helpers/filterValidImages";

// interfaces imports
import {
  validateScheduleDateFormatRequestBody,
  CreateScheduleBlogsRequestBody,
  ScheduledBlogData,
  ScheduleBlogsParams,
  RescheduleBlogRequestBody,
  UpdateScheduleBlogBodyRequestBody,
  IScheduledBlogsMiddleware,
  IBlog,
  IBlogAuthorRepository,
} from "../../interfaces/index";

@injectable()
export class ScheduledBlogsMiddleware implements IScheduledBlogsMiddleware {
  constructor(
    @inject(TYPES.BlogAuthorRepository)
    private readonly blogAuthorRepository: IBlogAuthorRepository
  ) {}
  public validateScheduleDateFormat = catchAsync(
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

  public validateCreateScheduledBlogPost = [
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
        const { title, content, categories, parsedDate } = req.body;

        const blogReadyData: ScheduledBlogData = {
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

  public validateRescheduleBlogPost = catchAsync(
    async (
      req: Request<
        ScheduleBlogsParams,
        {},
        RescheduleBlogRequestBody & validateScheduleDateFormatRequestBody
      >,
      res: Response,
      next: NextFunction
    ) => {
      const blogPost: IBlog =
        await this.blogAuthorRepository.getScheduleBlogPostByIdAndAuthor(
          req.params.blogId,
          req.user._id
        );

      req.body.blog = blogPost;
      req.body.rescheduleFormatDate = req.body.parsedDate;
      next();
    }
  );

  public validateUpdateScheduledBlogPost = catchAsync(
    async (
      req: Request<ScheduleBlogsParams, {}, UpdateScheduleBlogBodyRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const blogPost: IBlog =
        await this.blogAuthorRepository.getScheduleBlogPostByIdAndAuthor(
          req.params.blogId,
          req.user._id
        );
      req.body.blog = blogPost;
      next();
    }
  );
}
