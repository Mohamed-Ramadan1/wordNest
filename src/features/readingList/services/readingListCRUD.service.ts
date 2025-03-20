// Packages imports
import { ParsedQs } from "qs";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// shard imports
import {
  APIFeatures,
  AppError,
  handleServiceError,
  TYPES,
} from "@shared/index";
import { IReadingList } from "../interfaces/readingList.interface";

// models imports
import { ReadingListModel } from "../models/readingList.model";
import {
  IReadingListCRUDService,
  IReadingListRepository,
} from "../interfaces/index";

// redis client instance creation.
const redisClient = new Redis();

@injectable()
export class ReadingListCRUDService implements IReadingListCRUDService {
  constructor(
    @inject(TYPES.ReadingListRepository)
    private readingListRepository: IReadingListRepository
  ) {}
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
      handleServiceError(err);
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
      handleServiceError(err);
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
      handleServiceError(err);
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
      handleServiceError(err);
    }
  }
}
