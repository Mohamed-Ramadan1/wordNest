// modules / packages imports.
import { isEmail } from "class-validator";
import { NextFunction, Request, Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

// dto imports
import { RegistrationDto } from "../dtos/registration.dto";

import { LoginDTO } from "../dtos/login.dto";
import { logFailedLogin } from "@logging/loggers/authLogger";

export default class AuthMiddleware {
  public validateRegistration = [
    validateDto(RegistrationDto), // Step 1: Validate inputs using DTO
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new AppError("Email already in use", 409);
      }

      next();
    }),
  ];

  public validateLogin = [
    validateDto(LoginDTO),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user: IUser | null = await UserModel.findOne({ email }).select(
        "+password"
      );

      if (!user || !(await user.comparePassword(password, user.password))) {
        logFailedLogin(email, req.ip);
        throw new AppError("Invalid email or password", 401);
      }

      req.user = user;
      next();
    }),
  ];
}
