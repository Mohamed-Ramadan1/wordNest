// Purpose: Auth controller for handling authentication requests.

// Import necessary modules and packages  .
import { NextFunction, Request, Response } from "express";

// Models imports
import { IUser, UserModel } from "@features/users";

// Utils imports
import { AppError, catchAsync } from "@utils/index";

// services imports
import AccountRecoveryService from "../services/accountRecovery.service";
import { ApiResponse } from "@shared/index";
import { sendResponse } from "@utils/index";

export default class AccountRecoveryController {
  // Verify user's email address.
  static verifyEmail = catchAsync(async (req: Request, res: Response) => {
    await AccountRecoveryService.verifyEmail(req.user as IUser);

    const response: ApiResponse<null> = {
      status: "success",
      message: "Email Verified successfully",
    };
    sendResponse(200, res, response);
  });

  // Resend verification email.
  static resendVerification = catchAsync(
    async (req: Request, res: Response) => {
      await AccountRecoveryService.resendVerification(req.user as IUser );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Verification email resent successfully.",
      };
      sendResponse(200, res, response);
    }
  );

  // Forgot password.
  static requestPasswordReset = catchAsync(
    async (req: Request, res: Response) => {}
  );

  // Reset password.
  static resetPassword = catchAsync(async (req: Request, res: Response) => {});
}
