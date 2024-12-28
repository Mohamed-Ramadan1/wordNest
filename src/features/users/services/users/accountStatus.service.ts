// models imports
import UserModel from "../../models/user.model";

//mongoose imports
import { ClientSession, startSession, ObjectId } from "mongoose";

// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

export class AccountStatusService {
  // Account Activation/Deactivation
  static async activateAccount(userId: string) {
    // Logic to activate the account
  }

  static async deactivateAccount(userId: string) {
    // Logic to deactivate the account
  }
}
