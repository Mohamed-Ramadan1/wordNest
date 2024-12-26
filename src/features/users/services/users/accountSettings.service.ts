// models imports
import UserModel from "../../models/user.model";

//mongoose imports
import { ClientSession, startSession, ObjectId } from "mongoose";

// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

export class AccountSettingsService {
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

  // Account Deletion
  static async requestAccountDeletion(userId: string) {
    // Logic to handle account deletion request
  }

  static async confirmAccountDeletion(userId: string) {
    // Logic to confirm account deletion
  }

  // Account Activation/Deactivation
  static async activateAccount(userId: string) {
    // Logic to activate the account
  }

  static async deactivateAccount(userId: string) {
    // Logic to deactivate the account
  }
}
