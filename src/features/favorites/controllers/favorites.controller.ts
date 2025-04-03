//express imports
import { Response, Request } from "express";

// packages imports
import { injectable, inject } from "inversify";
// interface imports
import {
  FavoriteRequestBody,
  FavoriteRequestParams,
} from "../interfaces/favoritesRequest.interface";

// shared interface imports
import { ApiResponse, TYPES, catchAsync, IResponseUtils } from "@shared/index";

// services imports
import { IFavoritesService, IFavorite } from "../interfaces/index";

@injectable()
export class FavoritesController {
  constructor(
    @inject(TYPES.FavoritesService)
    private readonly favoritesService: IFavoritesService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
  /**
   * Handles the logic for adding a blog post to the user's favorites list.
   */
  public addToFavorites = catchAsync(
    async (req: Request<{}, {}, FavoriteRequestBody>, res: Response) => {
      await this.favoritesService.addToFavorites(req.body.blogPostId, req.user);
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post added to favorites successfully.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Handles the logic for removing a blog post from the user's favorites list.
   */
  public removeFromFavorites = catchAsync(
    async (req: Request<FavoriteRequestParams>, res: Response) => {
      await this.favoritesService.removeFromFavorites(
        req.params.favoriteId,
        req.user
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Blog post removed from favorites successfully.",
      };
      this.responseUtils.sendResponse(204, res, response);
    }
  );

  /**
   * Handles the logic for retrieving all blog posts in the user's favorites list.
   */
  public getFavorites = catchAsync(
    async (req: Request<FavoriteRequestParams>, res: Response) => {
      const favoritesBlogs = await this.favoritesService.getFavorites(
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
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Handles the logic for retrieving a specific blog post from the user's favorites list.
   */
  public getFavorite = catchAsync(
    async (req: Request<FavoriteRequestParams, {}>, res: Response) => {
      const blogPost = await this.favoritesService.getFavorite(
        req.params.favoriteId,
        req.user
      );
      const response: ApiResponse<IFavorite> = {
        status: "success",
        message: "User's favorite blog post retrieved successfully.",
        data: {
          favorite: blogPost,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
