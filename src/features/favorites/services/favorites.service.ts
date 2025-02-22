// Packages imports
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";
// model imports
import { FavoriteModel } from "../models/favorites.model";
// utils imports
import { APIFeatures, AppError } from "@utils/index";

import { IUser } from "@features/users";
import { IFavorite } from "../interfaces/favorites.interface";

// redis client instance creation.
const redisClient = new Redis();
// const cacheKey = `blog:${blogId}:${user._id}`;
export class FavoritesService {
  /**
   * Adds a blog post to the user's favorites list.
   */
  public static addToFavorites = async (blogPostId: ObjectId, user: IUser) => {
    try {
      await FavoriteModel.create({
        blogPost: blogPostId,
        user: user._id,
      });
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
  };

  /**
   * Removes a blog post from the user's favorites list.
   */
  public static removeFromFavorites = async (
    favoriteId: ObjectId,
    user: IUser
  ) => {
    const cacheKey = `favoriteItem:${favoriteId}:${user._id}`;
    try {
      const deletedFavorite = await FavoriteModel.findOneAndDelete({
        _id: favoriteId,
        user: user._id,
      });
      if (!deletedFavorite) {
        throw new AppError(
          "Failed to delete favorite item. please tray again.",
          404
        );
      }
      // Delete the cached data
      await redisClient.del(cacheKey);
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message, 400);
    }
  };

  /**
   * Retrieves all the blog posts in the user's favorites list.
   */
  public static getFavorite = async (
    favoriteId: ObjectId,
    user: IUser
  ): Promise<IFavorite> => {
    const cacheKey = `favoriteItem:${favoriteId}:${user._id}`;
    try {
      const cachedFavorite = await redisClient.get(cacheKey);
      if (cachedFavorite) {
        return JSON.parse(cachedFavorite); // Return cached response
      }
      const favorite: IFavorite | null = await FavoriteModel.findOne({
        id: favoriteId,
        user: user._id,
      });
      if (!favorite) {
        throw new AppError("No favorite item found match this id.", 404);
      }
      //  Store the fetched data in Redis (expires in 1 hour)
      await redisClient.setex(cacheKey, 3600, JSON.stringify(favorite));
      return favorite;
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message, 400);
    }
  };

  /**
   * Retrieves a specific blog post from the user's favorites list.
   */
  public static getFavorites = async (
    user: IUser,
    reqQuery: ParsedQs
  ): Promise<IFavorite[]> => {
    try {
      const features = new APIFeatures(
        FavoriteModel.find({
          user: user._id,
        }),
        reqQuery
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const favorites: IFavorite[] = await features.execute();
      return favorites;
    } catch (err: any) {
      throw new AppError(err.message, 400);
    }
  };
}
