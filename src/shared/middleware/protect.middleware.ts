import { Request, Response, NextFunction } from "express";

import { UserModel } from "@features/users";

// Utils imports
import { catchAsync, AppError } from "@utils/index";

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get token and check if it's there
    // check if the exist user have the token related to the user exist
    // if there user exist add the user to request object
    // req.user = user;
    next();
  }
);
