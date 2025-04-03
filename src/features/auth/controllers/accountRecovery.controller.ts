// Import necessary modules and packages  .
import { Request, Response } from "express";

// package imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// shared imports
import { ApiResponse, IResponseUtils, TYPES, catchAsync } from "@shared/index";

// interface imports
import { IAccountRecoveryService } from "../interfaces";

@injectable()
export default class AccountRecoveryController {
  constructor(
    @inject(TYPES.AccountRecoveryService)
    private readonly accountRecoveryService: IAccountRecoveryService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}
  // Verify user's email address.
  public verifyEmail = catchAsync(async (req: Request, res: Response) => {
    await this.accountRecoveryService.verifyEmail(req.user as IUser);

    const response: ApiResponse<null> = {
      status: "success",
      message: "Email Verified successfully",
    };
    this.responseUtils.sendResponse(200, res, response);
  });

  // Resend verification email.
  public resendVerification = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountRecoveryService.resendVerification(req.user as IUser);

      const response: ApiResponse<null> = {
        status: "success",
        message: "Verification email resent successfully.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  // Forgot password.
  public requestPasswordReset = catchAsync(
    async (req: Request, res: Response) => {
      await this.accountRecoveryService.requestPasswordReset(
        req.user as IUser,
        req.ip
      );

      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Password reset request was successful please check your email address .",
      };
      console.log("Iam here finaly");
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  // Reset password.
  public resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    await this.accountRecoveryService.resetPassword(
      req.user as IUser,
      newPassword,
      req.ip
    );

    const response: ApiResponse<null> = {
      status: "success",
      message:
        "Password reset successfully now you can login with your new password.",
    };
    this.responseUtils.sendResponse(200, res, response);
  });
}
