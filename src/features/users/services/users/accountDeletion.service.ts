// models imports
import UserModel from "../../models/user.model";

// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

export class AccountDeletionService {
  // Account Deletion
  static async requestAccountDeletion(user: IUser) {
    // Logic to handle account deletion request
  }

  static async confirmAccountDeletion(user: IUser) {
    // Logic to confirm account deletion
  }
}
