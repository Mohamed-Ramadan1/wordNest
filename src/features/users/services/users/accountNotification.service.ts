// packages imports
import { inject, injectable } from "inversify";

import { ObjectId } from "mongoose";
// packages imports

import { handleServiceError, TYPES } from "@shared/index";

// interfaces imports
import {
  IAccountNotificationService,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountNotificationService implements IAccountNotificationService {
  constructor(
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository
  ) {}
  // Notifications
  public async enableNotifications(userId: ObjectId): Promise<void> {
    // Logic to enable notifications
    try {
      this.userSelfRepository.updateNotificationsEnabled(userId, true);
    } catch (err: any) {
      handleServiceError(err);
    }
  }

  public async disableNotifications(userId: ObjectId): Promise<void> {
    try {
      this.userSelfRepository.updateNotificationsEnabled(userId, false);
    } catch (err: any) {
      handleServiceError(err);
    }
  }
}
