// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

import { ObjectId } from "mongoose";

// Shard imports
import { catchAsync, IResponseUtils, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { IUsersCrudService } from "../../interfaces/index";

// interface imports
import { IUser } from "@features/users/interfaces/user.interface";

@injectable()
export class UsersCrudController {
  constructor(
    @inject(TYPES.UsersCrudService)
    private readonly usersCrudService: IUsersCrudService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
  // get all users
  public getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await this.usersCrudService.getUsers(req);
    console.log(req.headers["user-agent"]);
    const response: ApiResponse<IUser[]> = {
      status: "success",
      message: "Users retrieved successfully",
      length: users.length,
      data: {
        users: users,
      },
    };
    this.responseUtils.sendResponse(200, res, response);
  });

  // get user by id
  public getUser = catchAsync(
    async (req: Request<{ id: ObjectId }>, res: Response) => {
      const user = await this.usersCrudService.getUser(req.params.id);

      const response: ApiResponse<IUser> = {
        status: "success",
        message: "User retrieved successfully",
        data: {
          user: user,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  // create user
  public createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await this.usersCrudService.createUser(req.body as IUser);

    const response: ApiResponse<IUser> = {
      status: "success",
      message: "User created successfully",
      data: {
        user: user,
      },
    };
    this.responseUtils.sendResponse(201, res, response);
  });

  // update user
  public updateUser = catchAsync(
    async (req: Request<{ id: ObjectId }>, res: Response) => {
      const updatedUser = await this.usersCrudService.updateUser(
        req.params.id,
        req.body as IUser
      );

      const response: ApiResponse<IUser> = {
        status: "success",
        message: "User updated successfully",
        data: {
          user: updatedUser,
        },
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  // delete user
  public deleteUser = catchAsync(
    async (req: Request<{ id: ObjectId }>, res: Response) => {
      await this.usersCrudService.deleteUser(req.params.id);

      const response: ApiResponse<null> = {
        status: "success",
        message: "User deleted successfully",
      };
      this.responseUtils.sendResponse(204, res, response);
    }
  );
}
