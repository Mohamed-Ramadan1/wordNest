// express imports
import { NextFunction, Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

import {
  IUser,
  IRolesManagementMiddleware,
  IUserManagementRepository,
  RolesManagementRequestParams,
  RolesManagementRequestBody,
} from "../../interfaces/index";

@injectable()
export class RolesManagementMiddleware implements IRolesManagementMiddleware {
  constructor(
    @inject(TYPES.UserManagementRepository)
    private readonly userManagementRepository: IUserManagementRepository
  ) {}
  // validate the request parameters
  public validateRequestParams = catchAsync(
    async (
      req: Request<
        RolesManagementRequestParams,
        {},
        RolesManagementRequestBody
      >,
      res: Response,
      next: NextFunction
    ) => {
      const { userId } = req.params;
      const { role } = req.body;

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
      const targetedUser: IUser =
        await this.userManagementRepository.getUserById(userId);

      req.userToBeAssigned = targetedUser;
      next();
    }
  );

  // validate add role to user
  public validateAddRoleToUser = catchAsync(
    async (
      req: Request<{}, {}, RolesManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { role } = req.body;
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
  public validateRemoveRoleFromUser = catchAsync(
    async (
      req: Request<{}, {}, RolesManagementRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
      const { role } = req.body;
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
