// packages imports
import { inject, injectable } from "inversify";

import { TYPES } from "@shared/index";
import { Model } from "mongoose";
// interface imports
import { IUserSelfRepository } from "../interfaces/index";
import { IUser } from "@features/users/index";
import { ObjectId } from "mongoose";
import { IFieldsToBeUpdates } from "../interfaces/fieldsToBeUpdate.interface";

@injectable()
export class UserSelfRepository implements IUserSelfRepository {
  constructor(
    @inject(TYPES.USER_MODEL) private readonly userModel: Model<IUser>
  ) {}
  public async saveAccountDeletionRequest(user: IUser): Promise<void> {
    try {
      user.createDeleteAccountRequestToken();
      await user.save();
    } catch (err: any) {
      throw new Error(
        `Failed to save account deletion request: ${err.message}`
      );
    }
  }

  public async deletionRequestConfirmation(user: IUser): Promise<Date> {
    try {
      user.userAccountToBeDeleted = true;
      user.deleteAccountConfirmedAt = new Date();
      const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days * hours * minutes * seconds * milliseconds
      // const thirtyDaysInMilliseconds = 1 * 60 * 1000; // 3 minutes * 60 seconds * 1000 milliseconds

      // Create a new Date object with the calculated timestamp (30 days from now)
      user.userAccountDeletedAt = new Date(
        new Date().getTime() + thirtyDaysInMilliseconds
      );
      // save the user document
      await user.save();

      return user.userAccountDeletedAt;
    } catch (err: any) {
      throw new Error(
        `Failed to save deletion request confirmation: ${err.message}`
      );
    }
  }

  public async saveEmailChangeRequest(
    user: IUser,
    newEmail: string
  ): Promise<void> {
    try {
      user.createChangeEmailRequestToken();
      user.tempChangedEmail = newEmail;
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to save email change request: ${err.message}`);
    }
  }

  public async confirmEmailChangeStatus(user: IUser): Promise<void> {
    try {
      user.changeEmailRequestToken = undefined;
      user.changeEmailVerificationTokenExpiresAt = undefined;
      user.changeEmailRequestConfirmedAt = new Date();
      user.isChangeEmailRequestConfirmed = true;
      user.createTempChangedEmailVerificationToken();
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to confirm email change status: ${err.message}`);
    }
  }

  public async resendNewEmailVerificationToken(user: IUser): Promise<void> {
    try {
      user.createTempChangedEmailVerificationToken();
      await user.save();
    } catch (err: any) {
      throw new Error(
        `Failed to resend new email verification token: ${err.message}`
      );
    }
  }

  public async verifyNewEmailOwnership(user: IUser): Promise<void> {
    try {
      user.resetChangeEmailRequestToken();
      user.resetTempChangedEmailVerificationToken();
      user.previousEmails.push({
        email: user.email,
        changedAt: new Date(),
      });

      if (user.tempChangedEmail) {
        user.email = user.tempChangedEmail;
      } else {
        throw new Error("New email address not found .");
      }
      user.emailChangeLockedUntil = new Date(Date.now() + 1000 * 60 * 60 * 24);
      user.tempChangedEmail = undefined;

      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to verify new email ownership: ${err.message}`);
    }
  }

  public async updateNotificationsEnabled(
    userId: ObjectId,
    enabled: boolean
  ): Promise<void> {
    try {
      const updatedUser: IUser | null = await this.userModel.findByIdAndUpdate(
        userId,
        {
          $set: { notificationsEnabled: enabled },
        }
      );
      if (!updatedUser) {
        throw new Error(`User not found with id: ${userId}`);
      }
    } catch (err: any) {}
  }

  public async updateUserPassword(
    user: IUser,
    newPassword: string
  ): Promise<void> {
    try {
      user.password = newPassword;
      user.passwordChangedAt = new Date();
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to update user password: ${err.message}`);
    }
  }

  public async saveAccountDeactivationRequest(user: IUser): Promise<void> {
    try {
      user.createDeactivationAccountToken();
      await user.save();
    } catch (err: any) {
      throw new Error(
        `Failed to save account deactivation request: ${err.message}`
      );
    }
  }

  public async updateDeactivationRequestConfirmed(user: IUser): Promise<void> {
    try {
      user.isActive = false;
      user.deactivationAccountToken = undefined;
      user.deactivationAccountTokenExpiredAt = undefined;
      user.lastDeactivationRequestAt = undefined;
      await user.save();
    } catch (err: any) {
      throw new Error(
        `Failed to update deactivation request confirmed: ${err.message}`
      );
    }
  }

  public async activateAccount(user: IUser): Promise<void> {
    try {
      user.isActive = true;
      user.reactivationAccountToken = undefined;
      user.reactivationAccountTokenExpiredAt = undefined;
      user.reactivationRequestCount = 0;
      user.lastReactivationRequestAt = undefined;
      await user.save();
    } catch (err: any) {
      throw new Error(`Failed to activate account: ${err.message || err}`);
    }
  }

  public async findUserById(userId: ObjectId): Promise<IUser> {
    try {
      const user: IUser | null = await this.userModel.findById(userId);
      if (!user) throw new Error("User not found with the given id.");
      return user;
    } catch (err: any) {
      throw new Error(`Failed to find user by id: ${err.message}`);
    }
  }

  public async updateUserProfilePicture(
    userId: ObjectId,
    pictureData: { url: string; publicId: string }
  ): Promise<IUser> {
    try {
      // update user profile picture and public id
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        {
          profilePicture: pictureData.url,
          profilePictureId: pictureData.publicId,
        },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (err: any) {
      throw new Error(`Failed to update user profile picture: ${err.message}`);
    }
  }

  public async updateUserProfileInformation(
    userId: ObjectId,
    updatedField: IFieldsToBeUpdates
  ): Promise<IUser> {
    try {
      const updatedUser: IUser | null = await this.userModel.findByIdAndUpdate(
        userId,
        updatedField,
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (err: any) {
      throw new Error(
        `Failed to update user profile information: ${err.message}`
      );
    }
  }
}
