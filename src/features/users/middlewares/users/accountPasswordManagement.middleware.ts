import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "@features/users/dtos/changePassword.dto";
import { validateDto } from "@utils/validate.dto";
import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";

export class AccountPasswordManagementMiddleware {
  static validateChangeAccountPassword = [
    validateDto(ChangePasswordDTO),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const userWithPassword = (await UserModel.findById(req.user?._id).select(
        "+password"
      )) as IUser;

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
