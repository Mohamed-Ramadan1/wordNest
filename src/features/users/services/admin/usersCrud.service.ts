// packages imports
import { inject, injectable } from "inversify";

//express imports
import { Request } from "express";
import { ObjectId } from "mongoose";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { IErrorUtils, TYPES } from "@shared/index";

// queues imports
import {
  emailQueue,
  EmailQueueJobs,
  deleteUserAccountQueue,
  DeleteUserAccountQueueJobs,
} from "@jobs/index";

// interfaces imports
import {
  IUsersCrudService,
  IUserManagementRepository,
} from "../../interfaces/index";

// CRUD operations for users.

@injectable()
export class UsersCrudService implements IUsersCrudService {
  constructor(
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  // get all users
  public getUsers = async (req: Request): Promise<IUser[]> => {
    try {
      const users: IUser[] = await this.userManagementRepository.getUsers(req);
      return users;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  // get user by id
  public getUser = async (id: ObjectId): Promise<IUser> => {
    try {
      const user: IUser | null =
        await this.userManagementRepository.getUserById(id);
      return user;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  // create user
  public createUser = async (userData: IUser): Promise<IUser> => {
    try {
      const user: IUser =
        await this.userManagementRepository.createUser(userData);

      // Send welcome email here.
      emailQueue.add(EmailQueueJobs.WelcomeEmail, { user });

      return user;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  //---------------------------------------------------------------------------------
  // update user
  public updateUser = async (id: ObjectId, userData: IUser): Promise<IUser> => {
    try {
      const updatedUser: IUser = await this.userManagementRepository.updateUser(
        id,
        userData
      );

      return updatedUser;
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };

  // delete user
  public deleteUser = async (id: ObjectId): Promise<void> => {
    try {
      const user: IUser = await this.userManagementRepository.getUserById(id);
      // Add delete user account job to queue to handle deletion of user account and related data.
      deleteUserAccountQueue.add(DeleteUserAccountQueueJobs.DeleteUserAccount, {
        user,
      });
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  };
}
