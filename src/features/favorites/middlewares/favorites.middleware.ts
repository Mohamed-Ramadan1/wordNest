//packages imports
import { inject, injectable } from "inversify";

import { Model } from "mongoose";

//express imports
import { Response, Request, NextFunction } from "express";

// shard imports
import { AppError, catchAsync, validateDto, TYPES } from "@shared/index";

// interfaces imports
import {
  FavoriteRequestBody,
  IFavorite,
  IFavoritesMiddleware,
  IFavoritesRepository,
} from "../interfaces/index";

import { IBlog } from "@features/blogs/interfaces/index";

// dto imports
import { addFavoriteItemDto } from "../dtos/addFavoriteItem.dto";

@injectable()
export class FavoritesMiddleware implements IFavoritesMiddleware {
  constructor(
    @inject(TYPES.BlogModel) private readonly blogModel: Model<IBlog>,
    @inject(TYPES.FavoritesRepository)
    private readonly favoritesRepository: IFavoritesRepository
  ) {}
  public validateAddToFavorites = [
    validateDto(addFavoriteItemDto),
    catchAsync(
      async (
        req: Request<{}, {}, FavoriteRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        // validate blog existing and not already in the user favorites
        const { blogPostId } = req.body;
        if (!blogPostId) {
          return next(new AppError("Blog post id is required", 400));
        }

        const blogPost: IBlog | null =
          await this.blogModel.findById(blogPostId);

        if (!blogPost) {
          return next(
            new AppError(
              "Blog post you intend to add to your favorites not exist check it and tray again",
              404
            )
          );
        }
        const existingFavorite: IFavorite | null =
          await this.favoritesRepository.getFavoriteItemsByUserAndBlogPost(
            req.user._id,
            blogPostId
          );
        if (existingFavorite) {
          return next(new AppError("Blog post already in favorites", 400));
        }

        next();
      }
    ),
  ] as any;
}
