// Purpose: Auth controller for handling authentication requests.

// Import necessary modules and packages  .
import { Request, Response } from "express";

// Models imports
import { IUser } from "@features/users";

// services imports
import AuthService from "../services/auth.service";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// interfaces imports
import { IAuthController } from "../interfaces/authController.interface";
import { ApiResponse } from "@shared/index";

export default class AuthController implements IAuthController {
  // !Register a new user with Google account.(Not implemented)
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

    sendResponse(201, res, re);
  });

  // Login a user with email address.
  emailLogin = catchAsync(async (req: Request, res: Response) => {
    const { token } = await AuthService.loginWithEmail(req.user, req.ip, res);

    const re: ApiResponse<IUser> = {
      status: "success",
      message: "User logged in successfully",
      token,
    };

    sendResponse(200, res, re);
  });

  // Logout a user.
  logout = catchAsync(async (req: Request, res: Response) => {
    const token: string = AuthService.logout(req.user, req.ip, res);

    const re: ApiResponse<string> = {
      status: "success ",
      message: "User logged out successfully",
      token,
    };

    sendResponse(200, res, re);
  });
}
