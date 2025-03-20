// packages imports
import { inject, injectable } from "inversify";
import { Model, Query, ObjectId } from "mongoose";
import { ParsedQs } from "qs";
// interfaces import
import {
  IReadingList,
  ReadingStatus,
  IReadingListRepository,
} from "../interfaces/index";

// Shard imports
import { APIFeaturesInterface, TYPES } from "@shared/index";

@injectable()
export class ReadingListRepository implements IReadingListRepository {
  constructor(
    @inject(TYPES.ReadingListModel)
    private readingListModel: Model<IReadingList>,

    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IReadingList[], IReadingList>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IReadingList>
  ) {}

  public async getUserReadingListItems(
    userId: ObjectId,
    reqQuery: ParsedQs
  ): Promise<IReadingList[]> {
    try {
      const feature = this.apiFeatures(
        this.readingListModel.find({ user: userId }),
        reqQuery
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const readingListItems: IReadingList[] = await feature.execute();
      return readingListItems;
    } catch (err: any) {
      throw new Error(
        `Error occurred while getting user reading list items: ${err.message}`
      );
    }
  }

  public async getReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<IReadingList> {
    try {
      const listItem: IReadingList | null = await this.readingListModel.findOne(
        {
          user: userId,
          _id: readingListItemId,
        }
      );
      if (!listItem) {
        throw new Error(
          "Reading list item not found with given id and owned by this user."
        );
      }
      return listItem;
    } catch (err: any) {
      throw new Error(
        `Error occurred while getting reading list item: ${err.message}`
      );
    }
  }

  public async createReadingListItem(
    useId: ObjectId,
    blogPostId: ObjectId,
    notes: string | undefined
  ): Promise<void> {
    try {
      const readingListItem: IReadingList | null =
        await this.readingListModel.create({
          user: useId,
          blogPost: blogPostId,
          notes,
        });

      if (!readingListItem) {
        throw new Error("Reading list item not created.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while creating reading list item: ${err.message}`
      );
    }
  }

  public async deleteReadingListItem(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      const deletedReadingListItem: IReadingList | null =
        await this.readingListModel.findOneAndDelete({
          _id: readingListItemId,
          user: userId,
        });

      if (!deletedReadingListItem) {
        throw new Error("Reading list item not found with provided id.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while deleting reading list item: ${err.message}`
      );
    }
  }

  public async updateReadingStatus(
    listItemId: ObjectId,
    userId: ObjectId,
    readingStatus: ReadingStatus
  ): Promise<void> {
    try {
      const updatedListItem: IReadingList | null =
        await this.readingListModel.findOneAndUpdate(
          {
            _id: listItemId,
            user: userId,
          },
          { status: readingStatus },
          { new: true }
        );
      if (!updatedListItem) {
        throw new Error("Reading list item not found.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while marking list item as unread: ${err.message}`
      );
    }
  }

  public async clearReadingList(userId: ObjectId): Promise<void> {
    try {
      const deletedItems = await this.readingListModel.deleteMany({
        user: userId,
      });

      if (!deletedItems.acknowledged) {
        throw new Error("Failed to clear reading list.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while clearing reading list: ${err.message}`
      );
    }
  }

  public async saveReminderAlertDate(
    readingItem: IReadingList,
    alertTime: Date
  ): Promise<void> {
    try {
      readingItem.lastInteractedAt = new Date();
      readingItem.reminderAlert = true;
      readingItem.reminderAlertTime = alertTime;
      await readingItem.save();
    } catch (err: any) {
      throw new Error(
        `Error occurred while saving reminder alert date: ${err.message}`
      );
    }
  }

  public async removeReminderAlertDate(
    readingListItemId: ObjectId,
    userId: ObjectId
  ): Promise<void> {
    try {
      const updatedReadingListItem: IReadingList | null =
        await this.readingListModel.findOneAndUpdate(
          { _id: readingListItemId, user: userId },
          {
            $set: {
              reminderAlert: false,
              reminderAlertTime: null,
              lastInteractedAt: new Date(),
            },
          },
          { new: true }
        );
      if (!updatedReadingListItem) {
        throw new Error("Reading list item not found.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while removing reminder alert date: ${err.message}`
      );
    }
  }

  public async toggleAutoRemovingListItem(
    listItemId: ObjectId,
    userId: ObjectId,
    autoRemoved: boolean
  ): Promise<void> {
    try {
      const updatedReadingListItem: IReadingList | null =
        await this.readingListModel.findOneAndUpdate(
          { _id: listItemId, user: userId },
          {
            $set: {
              autoRemove: autoRemoved,
              lastInteractedAt: new Date(),
            },
          },
          { new: true }
        );

      if (!updatedReadingListItem) {
        throw new Error("Reading list item not found.");
      }
    } catch (err: any) {
      throw new Error(
        `Error occurred while toggling auto removing list item: ${err.message}`
      );
    }
  }
}
