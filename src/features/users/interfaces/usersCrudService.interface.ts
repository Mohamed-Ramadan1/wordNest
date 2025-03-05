import { IUser } from "./user.interface";

export interface IUsersCrudService {
  /**
   * Retrieves all users with optional filtering, sorting, and pagination.
   */
  getUsers(req: Request): Promise<IUser[]>;

  /**
   * Retrieves a user by their unique ID.
   */
  getUser(id: string): Promise<IUser>;

  /**
   * Creates a new user and triggers a welcome email.
   */
  createUser(userData: IUser): Promise<IUser>;

  /**
   * Updates user details by their unique ID.
   */
  updateUser(id: string, userData: IUser): Promise<IUser>;

  /**
   * Deletes a user account and queues the deletion process.
   */
  deleteUser(id: string): Promise<void>;
}
