// packages imports
import { inject, injectable } from "inversify";

import { ObjectId } from "mongoose";
// packages imports

import { IErrorUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IAccountNotificationService,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountNotificationService implements IAccountNotificationService {
  constructor(
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  // Notifications
  public async enableNotifications(userId: ObjectId): Promise<void> {
    // Logic to enable notifications
    try {
      await this.userSelfRepository.updateNotificationsEnabled(userId, true);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }

  public async disableNotifications(userId: ObjectId): Promise<void> {
    try {
      await this.userSelfRepository.updateNotificationsEnabled(userId, false);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
