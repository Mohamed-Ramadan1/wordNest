// Purpose: Auth controller for handling authentication requests.

// Import necessary modules and packages  .
import { NextFunction, Request, Response } from "express";

// Models imports
import { UserModel } from "@features/users";

// services imports
import AuthService from "../services/auth.service";

// Utils imports
import { AppError, catchAsync, sendResponse } from "@utils/index";

export default class AuthController {
  // Register a new user with Google account.
  static socialRegister = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  // Register a new user with email address.
  static emailRegister = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, firstName, lastName, password } = req.body;
      const user = await AuthService.registerWithEmail(
        email,
        firstName,
        lastName,
        password
      );
      sendResponse(201, res, { user, status: "success" });
    }
  );

  // Login a user with email address.
  static emailLogin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  // Refresh token.
  static refreshAccessToken = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  // Logout a user.
  static logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}
