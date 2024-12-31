import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export class AccountDeletionMiddleware {
  // Account Deletion
  static validateRequestAccountDeletion = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Logic to handle account deletion request
    }
  );

  static validateConfirmAccountDeletion = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // Logic to confirm account deletion
    }
  );
}
