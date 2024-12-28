
//mongoose imports
import { ClientSession, startSession } from "mongoose";

// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

export class AccountPasswordManagementService {
  static async changePassword(user: IUser, newPassword: string): Promise<void> {
    const session: ClientSession = await startSession();
    try {
      session.startTransaction();

      // update user password
      user.password = newPassword;
      user.passwordChangedAt = new Date();
      await user.save({ session });

      await session.commitTransaction();
    } catch (err: any) {
      await session.abortTransaction();
      throw new AppError("Failed to change password", 500);
    } finally {
      session.endSession();
    }
  }
}
