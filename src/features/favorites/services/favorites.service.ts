// packages imports
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// shard imports
import { AppError, TYPES, IErrorUtils } from "@shared/index";

import { IUser } from "@features/users";

// interfaces imports
import {
  IFavoritesService,
  IFavorite,
  IFavoritesRepository,
} from "../interfaces/index";

// redis client instance creation.
const redisClient = new Redis();
// const cacheKey = `blog:${blogId}:${user._id}`;

@injectable()
export class FavoritesService implements IFavoritesService {
  constructor(
    @inject(TYPES.FavoritesRepository)
    private readonly favoritesRepository: IFavoritesRepository,
    @inject(TYPES.ErrorUtils)
    private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Adds a blog post to the user's favorites list.
   */
  public addToFavorites = async (blogPostId: ObjectId, user: IUser) => {
    try {
      await this.favoritesRepository.createFavoriteItem(blogPostId, user._id);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Removes a blog post from the user's favorites list.
   */
  public removeFromFavorites = async (favoriteId: ObjectId, user: IUser) => {
    const cacheKey = `favoriteItem:${favoriteId}:${user._id}`;
    try {
      await this.favoritesRepository.deleteFavoriteItem(favoriteId, user._id);

      // Delete the cached data
      await redisClient.del(cacheKey);
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Retrieves all the blog posts in the user's favorites list.
   */
  public getFavorite = async (
    favoriteId: ObjectId,
    user: IUser
  ): Promise<IFavorite> => {
    const cacheKey = `favoriteItem:${favoriteId}:${user._id}`;
    try {
      const cachedFavorite = await redisClient.get(cacheKey);
      if (cachedFavorite) {
        return JSON.parse(cachedFavorite); // Return cached response
      }
      const favorite: IFavorite =
        await this.favoritesRepository.getFavoriteItem(favoriteId, user._id);

      //  Store the fetched data in Redis (expires in 1 hour)
      await redisClient.setex(cacheKey, 3600, JSON.stringify(favorite));
      return favorite;
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      this.errorUtils.handleServiceError(err);
    }
  };

  /**
   * Retrieves a specific blog post from the user's favorites list.
   */
  public getFavorites = async (
    user: IUser,
    reqQuery: ParsedQs
  ): Promise<IFavorite[]> => {
    try {
      const favorites: IFavorite[] =
        await this.favoritesRepository.getFavoriteItems(user._id, reqQuery);
      return favorites;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
}
