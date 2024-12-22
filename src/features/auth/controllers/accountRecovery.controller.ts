// Purpose: Auth controller for handling authentication requests.

// Import necessary modules and packages  .
import { Request, Response } from "express";

// Models imports
import { IUser } from "@features/users";

// Utils imports
import { catchAsync } from "@utils/index";

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
      await AccountRecoveryService.resendVerification(req.user as IUser);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Verification email resent successfully.",
      };
      sendResponse(200, res, response);
    }
  );

  // Forgot password.
  static requestPasswordReset = catchAsync(
    async (req: Request, res: Response) => {
      await AccountRecoveryService.requestPasswordReset(
        req.user as IUser,
        req.ip
      );

      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Password reset request was successful please check your email address .",
      };
      sendResponse(200, res, response);
    }
  );

  // Reset password.
  static resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { newPassword, confirmNewPassword } = req.body;
    await AccountRecoveryService.resetPassword(
      req.user as IUser,
      newPassword,
      req.ip
    );

    const response: ApiResponse<null> = {
      status: "success",
      message:
        "Password reset successfully now you can login with your new password.",
    };
    sendResponse(200, res, response);
  });
}
