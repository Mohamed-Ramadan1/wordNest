//express imports
import { Response, Request, NextFunction } from "express";

// models imports
import { ReadingListModel } from "../models/readingList.model";
import BlogModel from "@features/blogs/models/blog.model";
// shard imports
import { AppError, catchAsync, validateDto } from "@shared/index";

// interfaces imports
import { CreateReadingListItemRequestBody } from "../interfaces/readingListCRUDRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

// dto imports
import { CreateReadingListItemDto } from "../dtos/createReadingListItem.dto";

export class ReadingListCRUDMiddleware {
  public static validateCreateReadingListItem = [
    validateDto(CreateReadingListItemDto),
    catchAsync(
      async (
        req: Request<{}, {}, CreateReadingListItemRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { blogPostId } = req.body;
        // check blog to be added into the list is existing
        const blogPost: IBlog | null = await BlogModel.findById(blogPostId);
        if (!blogPost) {
          return next(
            new AppError(
              "Blog post you intend to add to your reading list not exist check it and tray again",
              404
            )
          );
        }

        // check if the blog is already in the user reading list
        const existingReadingListItem = await ReadingListModel.findOne({
          blogPost: blogPostId,
          user: req.user._id,
        });
        if (existingReadingListItem) {
          return next(
            new AppError("Blog post already in your reading list", 400)
          );
        }
        next();
      }
    ),
  ];
}
