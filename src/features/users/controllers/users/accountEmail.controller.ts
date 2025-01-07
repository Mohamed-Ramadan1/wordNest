// system imports
import { Request, Response } from "express";

// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";
import { AccountEmailService } from "@features/users/services/users/accountEmail.service";

export class AccountEmailController {
  /**
   * Handles a request to change the user's email address.
   * Initiates the process, including generating a verification token.
   */
  public requestAccountEmailChange = catchAsync(
    async (req: Request, res: Response) => {
      const { newEmail } = req.body;
      await AccountEmailService.requestEmailChange(
        req.user as IUser,
        newEmail,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Email change request received. please check your email address for further instructions.",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Confirms the user's email address change.
   * Verifies the provided token and updates the email address in the user's account.
   */

  public confirmAccountEmailChange = catchAsync(
    async (req: Request, res: Response) => {
      await AccountEmailService.confirmEmailChange(req.user as IUser, req.ip);
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Email change successfully. please we send you a more details about the next step in your new email address. check your new email address for complete process. ",
      };
      sendResponse(200, res, response);
    }
  );
  /**
   * Verifies the new email address against the user's current email address.
   * Returns an error if the new email address is already associated with another user.
   */

  public verifyNewEmailOwnership = catchAsync(
    async (req: Request, res: Response) => {
      await AccountEmailService.verifyNewEmailOwnership(
        req.user as IUser,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Email ownership verification successful.",
      };
      sendResponse(200, res, response);
    }
  );
  /**
   * Initiates the process to resend the new email verification token.
   *
   * This is useful if the user did not receive the initial email.
   * The token is sent to the new email address.
   */

  public resendNewEmailVerificationToken = catchAsync(
    async (req: Request, res: Response) => {
      await AccountEmailService.resendNewEmailVerificationToken(
        req.user as IUser,
        req.ip
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "A new verification token has been sent to your new email address. Please check your new  email address.",
      };
      sendResponse(200, res, response);
    }
  );
}
