//packages imports
import { inject, injectable } from "inversify";
import { Model, ObjectId, Query } from "mongoose";
import { ParsedQs } from "qs";

// interfaces imports
import { IFavoritesRepository, IFavorite } from "../interfaces/index";

// shard imports
import { TYPES, APIFeaturesInterface } from "@shared/index";

@injectable()
export class FavoritesRepository implements IFavoritesRepository {
  constructor(
    @inject(TYPES.FavoriteModel) private favoriteModel: Model<IFavorite>, // Correct type

    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IFavorite[], IFavorite>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IFavorite>
  ) {}

  public async createFavoriteItem(
    blogPostId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      const createdFavoriteItem: IFavorite | null =
        await this.favoriteModel.create({
          blogPost: blogPostId,
          user: userId,
        });
      if (!createdFavoriteItem) {
        throw new Error("Failed to create favorite item. Please try again.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while creating favorite item: ${err.message}`
      );
    }
  }

  public async deleteFavoriteItem(
    favoriteId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      const deletedFavorite: IFavorite | null =
        await this.favoriteModel.findOneAndDelete({
          _id: favoriteId,
          user: userId,
        });

      if (!deletedFavorite) {
        throw new Error("Failed to delete favorite item. Please try again.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while deleting favorite item: ${err.message}`
      );
    }
  }

  public async getFavoriteItem(
    favoriteId: ObjectId,
    userId: ObjectId
  ): Promise<IFavorite> {
    try {
      const favorite: IFavorite | null = await this.favoriteModel.findOne({
        _id: favoriteId,
        user: userId,
      });

      if (!favorite) {
        throw new Error("Favorite item not found");
      }
      return favorite;
    } catch (err: any) {
      throw new Error(
        `Error occurred while retrieving favorite item: ${err.message}`
      );
    }
  }

  public async getFavoriteItems(
    userId: ObjectId,
    query: ParsedQs
  ): Promise<IFavorite[]> {
    try {
      const features = this.apiFeatures(
        this.favoriteModel.find({
          user: userId,
        }),
        query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const favorites: IFavorite[] = await features.execute();
      return favorites;
    } catch (err: any) {
      throw new Error(
        `Error occurred while retrieving favorite items: ${err.message}`
      );
    }
  }

  public async getFavoriteItemsByUserAndBlogPost(
    userId: ObjectId,
    blogPostId: ObjectId
  ): Promise<IFavorite | null> {
    try {
      const existingFavoriteItem: IFavorite | null =
        await this.favoriteModel.findOne({
          blogPost: blogPostId,
          user: userId,
        });
      return existingFavoriteItem;
    } catch (err: any) {
      throw new Error(
        `Error occurred while retrieving favorite item: ${err.message}`
      );
    }
  }
}
