// Purpose: Auth controller for handling authentication requests.

// Import necessary modules and packages  .
import { NextFunction, Request, Response } from "express";

// Models imports
import { IUser, UserModel } from "@features/users";

// services imports
import AuthService from "../services/auth.service";

// Utils imports
import { AppError, catchAsync, sendResponse } from "@utils/index";

// interfaces imports
import { IAuthController } from "../interfaces/authController.interface";
import { ApiResponse } from "@shared/index";
import {
  logSuccessfulLogin,
  logFailedLogin,
} from "@logging/loggers/authLogger";
import { logFailedEmailSent } from "@logging/loggers/emailLogger";

export default class AuthController implements IAuthController {
  // Register a new user with Google account.
  socialRegister = catchAsync(async (req: Request, res: Response) => {});

  // Register a new user with email address.
  emailRegister = catchAsync(async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body;
    const { user, token } = await AuthService.registerWithEmail(
      email,
      firstName,
      lastName,
      password,
      res
    );
    const re: ApiResponse<IUser> = {
      status: "success",
      token,
      data: { user },
    };

    logSuccessfulLogin(user.email, req.ip);
    logFailedEmailSent("Failed", user.email);
    sendResponse(201, res, re);
  });

  // Login a user with email address.
  emailLogin = catchAsync(async (req: Request, res: Response) => {});

  // Refresh token.
  refreshAccessToken = catchAsync(async (req: Request, res: Response) => {});

  // Logout a user.
  logout = catchAsync(async (req: Request, res: Response) => {});
}
