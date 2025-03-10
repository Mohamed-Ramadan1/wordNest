import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";
import { Request } from "express";

export interface IUsersCrudService {
  /**
   * Retrieves all users with optional filtering, sorting, and pagination.
   */
  getUsers(req: Request): Promise<IUser[]>;

  /**
   * Retrieves a user by their unique ID.
   */
  getUser(id: ObjectId): Promise<IUser>;

  /**
   * Creates a new user and triggers a welcome email.
   */
  createUser(userData: IUser): Promise<IUser>;

  /**
   * Updates user details by their unique ID.
   */
  updateUser(id: ObjectId, userData: IUser): Promise<IUser>;

  /**
   * Deletes a user account and queues the deletion process.
   */
  deleteUser(id: ObjectId): Promise<void>;
}
