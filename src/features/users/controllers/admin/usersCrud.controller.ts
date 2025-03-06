// express imports
import { Request, Response } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shard imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import { IUsersCrudService } from "../../interfaces/index";

// interface imports
import { IUser } from "@features/users/interfaces/user.interface";

@injectable()
export class UsersCrudController {
  private usersCrudService: IUsersCrudService;
  constructor(
    @inject(TYPES.UsersCrudService)
    usersCrudService: IUsersCrudService
  ) {
    this.usersCrudService = usersCrudService;
  }
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
    sendResponse(200, res, response);
  });

  // get user by id
  public getUser = catchAsync(async (req: Request, res: Response) => {
    const user = await this.usersCrudService.getUser(req.params.id);

    const response: ApiResponse<IUser> = {
      status: "success",
      message: "User retrieved successfully",
      data: {
        user: user,
      },
    };
    sendResponse(200, res, response);
  });

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
    sendResponse(201, res, response);
  });

  // update user
  public updateUser = catchAsync(async (req: Request, res: Response) => {
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
    sendResponse(200, res, response);
  });

  // delete user
  public deleteUser = catchAsync(async (req: Request, res: Response) => {
    await this.usersCrudService.deleteUser(req.params.id);

    const response: ApiResponse<null> = {
      status: "success",
      message: "User deleted successfully",
    };
    sendResponse(204, res, response);
  });
}
