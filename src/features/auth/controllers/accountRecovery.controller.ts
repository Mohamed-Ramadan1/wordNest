// Purpose: Auth controller for handling authentication requests.

// Import necessary modules and packages  .
import { NextFunction, Request, Response } from "express";

// Models imports
import { UserModel } from "@features/users";

// Utils imports
import { AppError, catchAsync,  } from "@utils/index";

export default class AccountRecoveryController {
  // Verify user's email address.
  static verifyEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  // Resend verification email.
  static resendVerification = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  // Forgot password.
  static requestPasswordReset = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );

  // Reset password.
  static resetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}
