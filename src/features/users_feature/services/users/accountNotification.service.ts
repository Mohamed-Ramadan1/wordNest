// models imports
import UserModel from "../../models/user.model";

//mongoose imports

import { ClientSession, startSession, ObjectId } from "mongoose";
// packages imports

import { AppError } from "@utils/appError";

// interfaces imports
import { IAccountNotificationService } from "../../interfaces/index";

export class AccountNotificationService implements IAccountNotificationService {
  // Notifications
  public async enableNotifications(userId: ObjectId): Promise<void> {
    // Logic to enable notifications
    const session: ClientSession = await startSession();
    try {
      session.startTransaction();
      await UserModel.findByIdAndUpdate(
        userId,
        { $set: { notificationsEnabled: true } },
        { session }
      );
      await session.commitTransaction();
    } catch (err: any) {
      await session.abortTransaction();
      throw new AppError(
        "field to enable user notification. please tray again.",
        500
      );
    } finally {
      session.endSession();
    }
  }

  public async disableNotifications(userId: ObjectId): Promise<void> {
    // Logic to disable notifications
    const session: ClientSession = await startSession();
    try {
      session.startTransaction();
      await UserModel.findByIdAndUpdate(
        userId,
        { $set: { notificationsEnabled: false } },
        { session }
      );
      await session.commitTransaction();
    } catch (err: any) {
      await session.abortTransaction();
      throw new AppError(
        "field to disable  user notifications. please tray again.",
        500
      );
    } finally {
      session.endSession();
    }
  }
}
