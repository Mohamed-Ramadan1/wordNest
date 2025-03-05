import { Secret, sign, SignOptions } from "jsonwebtoken";
import { IUser } from "@features/users_feature";
import { jwtConfig, Environment } from "@config/jwt.config";
import { Response, CookieOptions } from "express";

export const generateAuthToken = (user: IUser, res: Response) => {
  const signOptions: SignOptions = {
    expiresIn: jwtConfig.expiresIn as any,
  };

  const userToken: string = sign(
    { id: user._id },
    jwtConfig.secret as Secret,
    signOptions
  );

  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + parseInt(jwtConfig.cookieExpiredIn) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: jwtConfig.environment === Environment.Production,
  };

  res.cookie("jwt", userToken, cookieOptions);

  return userToken;
};
