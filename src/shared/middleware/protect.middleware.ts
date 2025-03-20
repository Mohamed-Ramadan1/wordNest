// express imports
import { Request, Response, NextFunction } from "express";

// package imports
import { JwtPayload } from "jsonwebtoken";

// shard imports
import { catchAsync } from "@shared/utils/catchAsync";

// helper imports
import {
  validateUserAccountStatus,
  validateHeaderTokenExists,
  verifyJWTValidity,
  checkUserExists,
} from "../helper/protectMiddleware.helper";

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string = validateHeaderTokenExists(req);

    const decoded: JwtPayload = verifyJWTValidity(token);

    const user = await checkUserExists(decoded.id);

    validateUserAccountStatus(user);

    req.user = user;
    next();
  }
);
