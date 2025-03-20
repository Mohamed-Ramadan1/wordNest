// Express imports
import { NextFunction, Request, Response } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { AppError, catchAsync, validateDto, TYPES } from "@shared/index";

import { ChangePasswordDTO } from "../../dtos/changePassword.dto";

import {
  IUser,
  IAccountPasswordManagementMiddleware,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountPasswordManagementMiddleware
  implements IAccountPasswordManagementMiddleware
{
  constructor(
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository
  ) {}

  public validateChangeAccountPassword = [
    validateDto(ChangePasswordDTO),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const userWithPassword: IUser =
        await this.userSelfRepository.findUserByIdAndSelectFields(
          req.user._id,
          ["+password"]
        );

      if (
        !userWithPassword.comparePassword(
          req.body.currentPassword,
          userWithPassword.password
        )
      ) {
        throw new AppError("Current password is incorrect", 400);
      }

      next();
    }),
  ];
}
