import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import { IUser } from "@features/users_feature";
import { IFavorite } from "../interfaces/favorites.interface";

export interface IFavoritesService {
  /**
   * Adds a blog post to the user's favorites list.
   * @param blogPostId - The ID of the blog post to add to favorites
   * @param user - The user adding the blog post to favorites
   * @throws {AppError} If there's an error adding to favorites
   */
  addToFavorites(blogPostId: ObjectId, user: IUser): Promise<void>;

  /**
   * Removes a blog post from the user's favorites list.
   * @param favoriteId - The ID of the favorite item to remove
   * @param user - The user removing the blog post from favorites
   * @throws {AppError} If the favorite item is not found or there's an error during deletion
   */
  removeFromFavorites(favoriteId: ObjectId, user: IUser): Promise<void>;

  /**
   * Retrieves a specific blog post from the user's favorites list.
   * @param favoriteId - The ID of the favorite item to retrieve
   * @param user - The user whose favorite item is being retrieved
   * @returns A promise resolving to the favorite item
   * @throws {AppError} If the favorite item is not found or there's an error during retrieval
   */
  getFavorite(favoriteId: ObjectId, user: IUser): Promise<IFavorite>;

  /**
   * Retrieves all the blog posts in the user's favorites list.
   * @param user - The user whose favorites are being retrieved
   * @param reqQuery - Query parameters for filtering, sorting, pagination, etc.
   * @returns A promise resolving to an array of favorite items
   * @throws {AppError} If there's an error during retrieval
   */
  getFavorites(user: IUser, reqQuery: ParsedQs): Promise<IFavorite[]>;
}
