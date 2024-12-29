// utils imports
import { AppError } from "@utils/appError";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";

export class AccountPasswordManagementService {
  static async changePassword(user: IUser, newPassword: string): Promise<void> {
    try {
      // update user password
      user.password = newPassword;
      user.passwordChangedAt = new Date();
      await user.save();
    } catch (err: any) {
      throw new AppError("Failed to change password", 500);
    }
  }
}
