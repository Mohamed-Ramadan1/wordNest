//express imports
import { Request } from "express";

// models imports
import UserModel from "@features/users/models/user.model";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { AppError, APIFeatures } from "@utils/index";

// queues imports

import { emailQueue, EmailQueueJobs } from "@jobs/index";

// CRUD operations for users.
export class UsersCrudService {
  // get all users
  static getUsers = async (req: Request): Promise<IUser[]> => {
    try {
      const features = new APIFeatures(UserModel.find({}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const users: IUser[] = await features.execute();
      return users;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  };

  // get user by id
  static getUser = async (id: string): Promise<IUser> => {
    try {
      const user: IUser | null = await UserModel.findById(id);
      if (!user) {
        throw new AppError("No user exist with this id.", 404);
      }
      return user;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  };

  // create user
  static createUser = async (userData: IUser): Promise<IUser> => {
    try {
      const user: IUser | null = await UserModel.create(userData);
      if (!user) {
        throw new AppError("Failed to create user.", 500);
      }
      user.createEmailVerificationToken();
      await user.save();
      // Send welcome email here.
      emailQueue.add(EmailQueueJobs.WelcomeEmail, { user });

      return user;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  };

  //---------------------------------------------------------------------------------
  // update user
  static updateUser = async (id: string, userData: IUser): Promise<IUser> => {
    try {
      const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(
        id,
        userData,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedUser) {
        throw new AppError("No user exist with this id.", 404);
      }
      return updatedUser;
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  };

  // delete user
  static deleteUser = async (id: string): Promise<void> => {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (err: any) {
      throw new AppError(err.message, 500);
    }
  };
}
