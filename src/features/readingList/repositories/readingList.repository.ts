// packages imports
import { inject, injectable } from "inversify";
import { Model, Query } from "mongoose";
import { ParsedQs } from "qs";
// interfaces import
import { IReadingList } from "../interfaces/index";

// Shard imports
import { APIFeaturesInterface, TYPES } from "@shared/index";

@injectable()
export class ReadingListRepository {
  constructor(
    @inject(TYPES.ReadingListModel)
    private readingListModel: Model<IReadingList>, // Correct type

    @inject(TYPES.APIFeatures)
    private readonly apiFeatures: (
      query: Query<IReadingList[], IReadingList>,
      queryString: ParsedQs
    ) => APIFeaturesInterface<IReadingList>
  ) {}

  public async getUserReadingListItems(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while getting user reading list items: ${err.message}`
      );
    }
  }

  public async getReadingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while getting reading list item: ${err.message}`
      );
    }
  }

  public async createReadingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while creating reading list item: ${err.message}`
      );
    }
  }

  public async updateReadingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while updating reading list item: ${err.message}`
      );
    }
  }

  public async deleteReadingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while deleting reading list item: ${err.message}`
      );
    }
  }

  public async markListItemAsUnread(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while marking list item as unread: ${err.message}`
      );
    }
  }

  public async markListItemAsCompleted(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while marking list item as completed: ${err.message}`
      );
    }
  }

  public async markListItemAsReading(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while marking list item as reading: ${err.message}`
      );
    }
  }

  public async clearReadingList(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while clearing reading list: ${err.message}`
      );
    }
  }

  public async saveReminderAlertDate(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while saving reminder alert date: ${err.message}`
      );
    }
  }

  public async removeReminderAlertDate(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while removing reminder alert date: ${err.message}`
      );
    }
  }

  public async reScheduleReminderAlert(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while rescheduling reminder alert date: ${err.message}`
      );
    }
  }

  public async toggleAutoRemovingListItem(): Promise<void> {
    try {
    } catch (err: any) {
      throw new Error(
        `Error occurred while toggling auto removing list item: ${err.message}`
      );
    }
  }
}
