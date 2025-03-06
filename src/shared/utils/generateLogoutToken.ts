import { Secret, sign } from "jsonwebtoken";
import { IUser } from "@features/users";
import { Response } from "express";
import { jwtConfig } from "@config/jwt.config";

export const generateLogOutToken = (user: IUser, res: Response): string => {
  const token: string = sign({ id: user._id }, jwtConfig.secret as Secret, {
    expiresIn: "1s",
  });

  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  return token;
};
