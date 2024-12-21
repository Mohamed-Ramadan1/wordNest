// modules / packages imports.
import { isEmail } from "class-validator";
import { NextFunction, Request, Response } from "express";
// Models imports
import { IUser, UserModel } from "@features/users";

// utils imports
import { AppError, catchAsync, validateDto } from "@utils/index";

export class AccountRecoveryMiddleware {
  static validateVerifyEMails = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // find the user who have the token and its not expired.
      const user: IUser | null = await UserModel.findOne({
        emailVerificationToken: req.params.token,
        emailVerificationExpires: { $gt: new Date() },
      });
      if (!user) {
        throw new AppError("Token is invalid or has expired", 400);
      }
      req.user = user;
      next();
    }
  );

  static validateResendEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.user && req.user.emailVerified) {
        throw new AppError("Email is already verified", 400);
      }
      next();
    }
  );
}
