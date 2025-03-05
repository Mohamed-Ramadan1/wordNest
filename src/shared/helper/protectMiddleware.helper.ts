import { IUser } from "@features/users_feature";
import { AppError } from "@utils/index";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "@features/users_feature";

export const validateUserAccountStatus = (user: IUser): void => {
  // check if user account is to be deleted
  if (user.userAccountToBeDeleted) {
    throw new AppError(
      "This account is in the grace period for deletion. Please contact support to restore your account.",
      401
    );
  }

  if (user.isActive === false) {
    throw new AppError(
      "Your account has been deactivated. Please contact support for more information.",
      401
    );
  }

  if (user.isAccountLocked) {
    throw new AppError(
      "User account is  locked you cant preform any actions please contact support or apply for appel.",
      400
    );
  }
};

export const validateHeaderTokenExists = (req: Request): string => {
  let token: string = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError("You are not logged in! Please log in", 401);
  }

  return token;
};

export const verifyJWTValidity = (token: string): JwtPayload => {
  let decoded: JwtPayload | string;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new AppError("Invalid token. Please log in again", 401);
  }

  // Ensure decoded is a JwtPayload and has exp
  if (typeof decoded === "string" || !decoded.exp) {
    throw new AppError("Invalid token. Please log in again", 401);
  }

  // Check if the token has expired
  if (decoded.exp < Date.now() / 1000) {
    throw new AppError("Token expired. Please log in again", 401);
  }
  return decoded;
};

export const checkUserExists = async (userId: IUser): Promise<IUser> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(
      "The user belonging to this token no longer exists",
      401
    );
  }
  return user;
};
