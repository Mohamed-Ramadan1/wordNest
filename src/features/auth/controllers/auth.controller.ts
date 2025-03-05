//packages imports
import { inject, injectable } from "inversify";

// Import necessary modules and packages  .
import { Request, Response } from "express";

// Models imports
import { IUser } from "@features/users";

// Utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shard imports
import { ApiResponse, TYPES } from "@shared/index";

// interface imports
import { IAuthService } from "../interfaces";

@injectable()
export default class AuthController {
  private authService: IAuthService;
  constructor(@inject(TYPES.AuthService) authService: IAuthService) {
    this.authService = authService;
  }
  // !Register a new user with Google account.(Not implemented)
  socialRegister = catchAsync(async (req: Request, res: Response) => {});

  // Register a new user with email address.
  public emailRegister = catchAsync(async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body;
    const { user, token } = await this.authService.registerWithEmail(
      email,
      firstName,
      lastName,
      password,
      res
    );
    const response: ApiResponse<IUser> = {
      status: "success",
      token,
      data: { user },
    };

    sendResponse(201, res, response);
  });

  // Login a user with email address.
  public emailLogin = catchAsync(async (req: Request, res: Response) => {
    const { token } = await this.authService.loginWithEmail(
      req.user,
      req.ip,
      res
    );

    const re: ApiResponse<IUser> = {
      status: "success",
      message: "User logged in successfully",
      token,
    };

    sendResponse(200, res, re);
  });

  // Logout a user.
  public logout = catchAsync(async (req: Request, res: Response) => {
    const token: string = this.authService.logout(req.user, req.ip, res);

    const re: ApiResponse<string> = {
      status: "success ",
      message: "User logged out successfully",
      token,
    };

    sendResponse(200, res, re);
  });
}
