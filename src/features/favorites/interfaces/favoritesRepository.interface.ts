import { IFavorite } from "./index";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
/**
 * Interface defining the contract for the Favorites repository.
 * This interface outlines methods for managing favorite items in the application,
 * including creation, deletion, and retrieval based on user and blog post associations.
 *
 * @interface IFavoritesRepository
 */
export interface IFavoritesRepository {
  /**
   * Creates a new favorite item in the repository for a specific blog post and user.
   *
   * @param {ObjectId} blogPostId - The ID of the blog post to be favorited.
   * @param {ObjectId} userId - The ID of the user favoriting the blog post.
   * @returns {Promise<void>} A promise that resolves when the favorite item is successfully created.
   * @throws {Error} If the favorite item creation fails or an error occurs.
   */
  createFavoriteItem(blogPostId: ObjectId, userId: ObjectId): Promise<void>;

  /**
   * Deletes a favorite item from the repository by its ID and associated user.
   *
   * @param {ObjectId} favoriteId - The ID of the favorite item to delete.
   * @param {ObjectId} userId - The ID of the user who owns the favorite item.
   * @returns {Promise<void>} A promise that resolves when the item is successfully deleted.
   * @throws {Error} If the favorite item is not found or deletion fails.
   */
  deleteFavoriteItem(favoriteId: ObjectId, userId: ObjectId): Promise<void>;

  /**
   * Retrieves a single favorite item by its ID and associated user.
   *
   * @param {string} favoriteId - The ID of the favorite item to retrieve.
   * @param {ObjectId} userId - The ID of the user associated with the favorite item.
   * @returns {Promise<IFavorite>} A promise that resolves to the requested favorite item.
   * @throws {Error} If the favorite item is not found or an error occurs.
   */
  getFavoriteItem(favoriteId: ObjectId, userId: ObjectId): Promise<IFavorite>;

  /**
   * Retrieves all favorite items for a specific user, with optional query filtering.
   *
   * @param {ObjectId} userId - The ID of the user whose favorite items are being retrieved.
   * @param {ParsedQs} query - Query string parameters for filtering, sorting, and pagination.
   * @returns {Promise<IFavorite[]>} A promise that resolves to an array of favorite items.
   * @throws {Error} If an error occurs while retrieving the favorite items.
   */
  getFavoriteItems(userId: ObjectId, query: ParsedQs): Promise<IFavorite[]>;

  /**
   * Retrieves a favorite item associated with a specific user and blog post, if it exists.
   *
   * @param {ObjectId} userId - The ID of the user whose favorite is being retrieved.
   * @param {ObjectId} blogPostId - The ID of the blog post associated with the favorite.
   * @returns {Promise<IFavorite | null>} A promise that resolves to the matching favorite item or null if not found.
   * @throws {Error} If an error occurs while retrieving the favorite item.
   */
  getFavoriteItemsByUserAndBlogPost(
    userId: ObjectId,
    blogPostId: ObjectId
  ): Promise<IFavorite | null>;
}
