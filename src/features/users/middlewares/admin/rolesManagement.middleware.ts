import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { IUser, Roles } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";

export class RolesManagementMiddleware {
  // validate the request parameters
  static validateRequestParams = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId: string = req.params.userId;
      const role: Roles = req.body.role;

      // check if role is valid
      if (!role) {
        return next(
          new AppError(
            "Role is required.please provide role name you want to assign to user.",
            400
          )
        );
      }

      // check if user id is valid and user exists.
      const targetedUser: IUser | null = await UserModel.findById(userId);

      if (!targetedUser) {
        return next(
          new AppError(
            "No user existing with this id. please check the target user id.",
            404
          )
        );
      }

      req.userToBeAssigned = targetedUser;
      next();
    }
  );

  // validate add role to user
  static validateAddRoleToUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const role: Roles = req.body.role;
      const targetedUser: IUser = req.userToBeAssigned;
      // check if user already has the role assigned
      if (targetedUser.roles.includes(role)) {
        return next(
          new AppError(
            "User already has this role assigned. please check the role you are trying to assign.",
            400
          )
        );
      }
      next();
    }
  );

  // validate remove role from user
  static validateRemoveRoleFromUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const role: Roles = req.body.role;
      const userToBeAssigned: IUser = req.userToBeAssigned;
      // check if user already has the role assigned
      if (!userToBeAssigned.roles.includes(role)) {
        return next(
          new AppError(
            "User does not have this role assigned. please check the role you are trying to remove.",
            400
          )
        );
      }
      next();
    }
  );
}
