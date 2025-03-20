// packages imports
import { inject, injectable } from "inversify";
import { Model } from "mongoose";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import { AppError, catchAsync, validateDto, TYPES } from "@shared/index";

// interfaces imports
import {
  CreateReadingListItemRequestBody,
  IReadingList,
  IReadingListCRUDMiddleware,
} from "../interfaces/index";
import { IBlog } from "@features/blogs/interfaces/index";

// dto imports
import { CreateReadingListItemDto } from "../dtos/createReadingListItem.dto";

@injectable()
export class ReadingListCRUDMiddleware implements IReadingListCRUDMiddleware {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.ReadingListModel)
    private readingListModel: Model<IReadingList>
  ) {}
  public validateCreateReadingListItem = [
    validateDto(CreateReadingListItemDto),
    catchAsync(
      async (
        req: Request<{}, {}, CreateReadingListItemRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { blogPostId } = req.body;
        // check blog to be added into the list is existing
        const blogPost: IBlog | null =
          await this.blogModel.findById(blogPostId);
        if (!blogPost) {
          return next(
            new AppError(
              "Blog post you intend to add to your reading list not exist check it and tray again",
              404
            )
          );
        }

        // check if the blog is already in the user reading list
        const existingReadingListItem = await this.readingListModel.findOne({
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
