// core module imports
import fs from "fs";

// models imports
import UserModel from "../../models/user.model";

//mongoose imports

import { ClientSession, startSession, ObjectId } from "mongoose";
// packages imports
import cloudinary from "cloudinary";
import { AppError } from "@utils/appError";
import { IUser } from "@features/users/interfaces/user.interface";

// config imports
import { CloudinaryQueueType } from "@config/cloudinaryQueue.config";

// jobs imports
import { cloudinaryQueue } from "@jobs/index";
// logs imports
import { logFailedImageUpload } from "@logging/index";
// dto imports
import { IFieldsToBeUpdates } from "@features/users/dtos/users.dto";

export class AccountSettingsService {
  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    // Logic to change the account password
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
