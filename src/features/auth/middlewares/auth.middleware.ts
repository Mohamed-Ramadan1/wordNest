// modules / packages imports.
import { isEmail } from "class-validator";
import { NextFunction, Request, Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

// dto imports
import { RegistrationDto } from "../dtos/registration.dto";

import { LoginDTO } from "../dtos/login.dto";
import { logFailedLogin } from "@logging/index";
import { emailQueue } from "@jobs/index";
import { EmailQueueType } from "@config/emailQueue.config";

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

      if (!user || !user.comparePassword(password, user.password)) {
        logFailedLogin(email, req.ip);
        throw new AppError("Invalid email or password", 401);
      }

      if (!user.isActive) {
        // Check if user has reached max attempts (4) and needs to wait
        if (user.reactivationRequestCount >= 4) {
          const lastRequestDate = user.lastReactivationRequestAt;
          const hoursElapsed = lastRequestDate
            ? Math.abs(new Date().getTime() - lastRequestDate.getTime()) /
              (1000 * 60 * 60)
            : 0;

          if (hoursElapsed < 48) {
            throw new AppError(
              `Your account is inactive. You've reached the maximum reactivation attempts. ` +
                `Please wait ${Math.ceil(48 - hoursElapsed)} hours before trying again. ` +
                `If you haven't received the emails, check your spam folder or contact support.`,
              401
            );
          }
          // Reset counter if 48 hours have passed
          user.reactivationRequestCount = 0;
        }

        // Use existing schema method to generate token and update counts
        user.createReactivationAccountToken();
        await user.save({ validateBeforeSave: false });

        // Add email to queue
        await emailQueue.add(EmailQueueType.ReactivateAccountConfirm, { user });

        throw new AppError(
          "Account is deactivated. We've sent you an email with instructions to reactivate your account.",
          401
        );
      }

      req.user = user;
      next();
    }),
  ];
}
