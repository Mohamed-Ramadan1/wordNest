import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@features/users/models/user.model";
import { catchAsync, AppError } from "@utils/index";

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("You are not logged in! Please log in", 401));
    }

    let decoded: JwtPayload | string;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return next(new AppError("Invalid token. Please log in again", 401));
    }

    // Ensure decoded is a JwtPayload and has exp
    if (typeof decoded === "string" || !decoded.exp) {
      return next(new AppError("Invalid token. Please log in again", 401));
    }

    // Check if the token has expired
    if (decoded.exp < Date.now() / 1000) {
      return next(new AppError("Token expired. Please log in again", 401));
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }
    // check if user account is to be deleted
    if (user.userAccountToBeDeleted) {
      throw new AppError(
        "This account is in the grace period for deletion. Please contact support to restore your account.",
        401
      );
    }

    if (user.isActive === false) {
      return next(
        new AppError(
          "Your account has been deactivated. Please contact support for more information.",
          401
        )
      );
    }

    req.user = user;
    next();
  }
);
