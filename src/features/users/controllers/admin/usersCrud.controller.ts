// express imports
import { Request, Response } from "express";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// services imports
import { UsersCrudService } from "@features/users/services/admin/usersCrud.service";
// utils imports
import { ApiResponse } from "@shared/index";

// interface imports
import { IUser } from "@features/users/interfaces/user.interface";

export class UsersCrudController {
  // get all users
  public getUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UsersCrudService.getUsers(req);
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
    const user = await UsersCrudService.getUser(req.params.id);

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
    const user = await UsersCrudService.createUser(req.body as IUser);

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
    const updatedUser = await UsersCrudService.updateUser(
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
    await UsersCrudService.deleteUser(req.params.id);

    const response: ApiResponse<null> = {
      status: "success",
      message: "User deleted successfully",
    };
    sendResponse(204, res, response);
  });
}
