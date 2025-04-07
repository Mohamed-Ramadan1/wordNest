// Packages imports
import { ParsedQs } from "qs";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongoose";
import Redis from "ioredis";

// shard imports
import { IErrorUtils, TYPES } from "@shared/index";
import { IReadingList } from "../interfaces/readingList.interface";

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
    private readonly readingListRepository: IReadingListRepository,
    @inject(TYPES.ErrorUtils)
    private readonly errorUtils: IErrorUtils
  ) {}
  /**
   * Retrieves all reading list items.
   */
  public async getAllReadingListItems(
    userId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IReadingList[]> {
    try {
      const readingList: IReadingList[] =
        await this.readingListRepository.getUserReadingListItems(
          userId,
          reqQuery
        );

      return readingList;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
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
      const readingListItem: IReadingList | null =
        await this.readingListRepository.getReadingListItem(
          readingListItemId,
          userId
        );

      await redisClient.setex(cacheKey, 3600, JSON.stringify(readingListItem));
      return readingListItem;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
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
      await this.readingListRepository.createReadingListItem(
        useId,
        blogPostId,
        notes
      );
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
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
      await this.readingListRepository.deleteReadingListItem(
        readingListItemId,
        userId
      );

      await redisClient.del(cacheKey);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
