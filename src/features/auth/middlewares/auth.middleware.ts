// modules / packages imports.
import { isEmail } from "class-validator";
import { NextFunction, Request, Response } from "express";
// Models imports
import { UserModel } from "@features/users";

// utils imports
import {
  AppError,
  catchAsync,
  generateAuthToken,
  generateLogOutToken,
} from "@utils/index";

export default class AuthMiddleware {
  public validateRegistration = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, firstName, lastName, password } = req.body;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new AppError("Email already in use", 409);
      }

      next();
    }
  );
}
