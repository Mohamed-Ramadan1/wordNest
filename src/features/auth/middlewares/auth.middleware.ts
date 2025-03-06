// modules / packages imports.

import { NextFunction, Request, Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// shard imports
import { AppError, catchAsync, validateDto } from "@shared/index";

// dto imports
import { RegistrationDto } from "../dtos/registration.dto";

import { LoginDTO } from "../dtos/login.dto";
import { logFailedLogin } from "@logging/index";
import {
  checkAccountDeletionStatus,
  checkAccountLockStatus,
  handleInactiveAccount,
  checkAccountLoginLockedStatus,
  lockAccountLogin,
} from "../helper/accountValidation.helper";
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

      // If no user is found, log and throw an error
      if (!user) {
        logFailedLogin(
          email,
          req.ip,
          `No user existing with email address ${email}`
        ); // Log failed login attempt
        throw new AppError("Invalid email or password", 401);
      }
      // Call checkAccountLoginLockedStatus only once before any other checks
      await checkAccountLoginLockedStatus(user);

      // Validate password
      const isPasswordValid = await user.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        // Increment login attempts and potentially lock the account
        await lockAccountLogin(user);
        logFailedLogin(email, req.ip, "Invalid credentials"); // Log failed login attempt
        throw new AppError("Invalid email or password", 401);
      }
      // Check account deletion status (if account marked for deletion)
      checkAccountDeletionStatus(user);

      // Check account lock status
      checkAccountLockStatus(user);

      // Handle inactive account
      await handleInactiveAccount(user);

      req.user = user;

      next();
    }),
  ];
}
