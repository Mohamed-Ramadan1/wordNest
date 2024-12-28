// models imports
import UserModel from "../../models/user.model";

//mongoose imports
import { ClientSession, startSession, ObjectId } from "mongoose";

// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

export class AccountDeletionService {
  // Account Deletion
  static async requestAccountDeletion(userId: string) {
    // Logic to handle account deletion request
  }

  static async confirmAccountDeletion(userId: string) {
    // Logic to confirm account deletion
  }
}
