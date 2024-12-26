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

export class AccountEmailService {
  // Email Management
  static async requestEmailChange(userId: string, newEmail: string) {
    // Logic to request an email change
  }

  static async confirmEmailChange(userId: string, token: string) {
    // Logic to confirm email change
  }
}
