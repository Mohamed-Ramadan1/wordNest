//express imports
import { Response, Request, NextFunction } from "express";

// models imports
import { FavoriteModel } from "../models/favorites.model";
import BlogModel from "@features/blogs/models/blog.model";
// shard imports
import { AppError, catchAsync, validateDto } from "@shared/index";

// interfaces imports
import { FavoriteRequestBody } from "../interfaces/favoritesRequest.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";

// dto imports
import { addFavoriteItemDto } from "../dtos/addFavoriteItem.dto";
export class FavoritesMiddleware {
  public static validateAddToFavorites = [
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

        const blogPost: IBlog | null = await BlogModel.findById(blogPostId);

        if (!blogPost) {
          return next(
            new AppError(
              "Blog post you intend to add to your favorites not exist check it and tray again",
              404
            )
          );
        }
        const existingFavorite = await FavoriteModel.findOne({
          blogPost: blogPostId,
          user: req.user._id,
        });
        if (existingFavorite) {
          return next(new AppError("Blog post already in favorites", 400));
        }

        next();
      }
    ),
  ];
}
