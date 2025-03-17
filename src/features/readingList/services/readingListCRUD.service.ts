// Packages imports
import { ParsedQs } from "qs";
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// shard imports
import { APIFeatures, AppError } from "@shared/index";
import { IReadingList } from "../interfaces/readingList.interface";

// interface imports

// models imports
import { ReadingListModel } from "../models/readingList.model";
import { IReadingListCRUDService } from "../interfaces/index";

// redis client instance creation.
const redisClient = new Redis();
export class ReadingListCRUDService implements IReadingListCRUDService {
  /**
   * Retrieves all reading list items.
   */
  public async getAllReadingListItems(
    userId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IReadingList[]> {
    try {
      const features = new APIFeatures(
        ReadingListModel.find({ user: userId }),
        reqQuery
      );
      const readingList = await features.execute();
      return readingList;
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Retrieves a specific reading list item.
   */
  public async getReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<IReadingList> {
    const cacheKey = `readingListItem:${readingListItemId}:${userId}`;
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const readingListItem = await ReadingListModel.findOne({
        _id: readingListItemId,
        user: userId,
      });
      if (!readingListItem) {
        throw new AppError(
          "Reading list item not found with provided id.",
          404
        );
      }
      await redisClient.setex(cacheKey, 3600, JSON.stringify(readingListItem));
      return readingListItem;
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Creates a new reading list item.
   */

  public async createReadingListItem(
    useId: ObjectId,
    blogPostId: ObjectId,
    notes: string | undefined
  ): Promise<void> {
    try {
      const readingListItem = await ReadingListModel.create({
        user: useId,
        blogPost: blogPostId,
        notes,
      });

      if (!readingListItem) {
        throw new AppError("Reading list item not created.", 500);
      }
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message, 500);
    }
  }

  /**
   * Deletes a reading list item.
   */

  public async deleteReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    const cacheKey = `readingListItem:${readingListItemId}:${userId}`;
    try {
      const deletedReadingListItem = await ReadingListModel.findOneAndDelete({
        _id: readingListItemId,
        user: userId,
      });

      if (!deletedReadingListItem) {
        throw new AppError(
          "Reading list item not found with provided id.",
          404
        );
      }
      await redisClient.del(cacheKey);
    } catch (err: any) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(err.message, 500);
    }
  }
}
