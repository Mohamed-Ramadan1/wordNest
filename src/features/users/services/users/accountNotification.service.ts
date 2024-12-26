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

export class AccountNotificationService {
  // Notifications
  static async enableNotifications(userId: string) {
    // Logic to enable notifications
  }

  static async disableNotifications(userId: string) {
    // Logic to disable notifications
  }
}
