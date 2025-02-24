//express imports
import { Response, Request } from "express";

// interface imports
import {
  FavoriteRequestBody,
  FavoriteRequestParams,
} from "../interfaces/favoritesRequest.interface";
// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

// services imports
import { FavoritesService } from "../services/favorites.service";
import { IFavorite } from "../interfaces/favorites.interface";
export class FavoritesController {
  /**
   * Handles the logic for adding a blog post to the user's favorites list.
   */
  public addToFavorites = catchAsync(
    async (req: Request<{}, {}, FavoriteRequestBody>, res: Response) => {
      await FavoritesService.addToFavorites(req.body.blogPostId, req.user);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post added to favorites successfully.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Handles the logic for removing a blog post from the user's favorites list.
   */
  public removeFromFavorites = catchAsync(
    async (req: Request<FavoriteRequestParams>, res: Response) => {
      await FavoritesService.removeFromFavorites(
        req.params.favoriteId,
        req.user
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post removed from favorites successfully.",
      };
      sendResponse(204, res, response);
    }
  );

  /**
   * Handles the logic for retrieving all blog posts in the user's favorites list.
   */
  public getFavorites = catchAsync(
    async (req: Request<FavoriteRequestParams>, res: Response) => {
      const favoritesBlogs = await FavoritesService.getFavorites(
        req.user,
        req.query
      );
      const response: ApiResponse<IFavorite[]> = {
        status: "success",
        message: "User's favorite blog posts retrieved successfully.",
        results: favoritesBlogs.length,
        data: {
          favorites: favoritesBlogs,
        },
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Handles the logic for retrieving a specific blog post from the user's favorites list.
   */
  public getFavorite = catchAsync(
    async (req: Request<{}, {}, FavoriteRequestBody>, res: Response) => {
      const blogPost = await FavoritesService.getFavorite(
        req.body.blogPostId,
        req.user
      );
      const response: ApiResponse<IFavorite> = {
        status: "success",
        message: "User's favorite blog post retrieved successfully.",
        data: {
          favorite: blogPost,
        },
      };
      sendResponse(200, res, response);
    }
  );
}
