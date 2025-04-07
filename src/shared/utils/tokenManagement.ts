import { Secret, sign, SignOptions } from "jsonwebtoken";
import { jwtConfig, Environment } from "@config/jwt.config";
import { Response, CookieOptions } from "express";
import { ObjectId } from "mongoose";
import { ITokenManagement } from "../interfaces/tokenManagement.interface";

export class TokenManagement implements ITokenManagement {
  constructor() {}
  generateAccessToken(userId: ObjectId, res: Response): string {
    const signOptions: SignOptions = {
      expiresIn: jwtConfig.expiresIn as any,
    };

    const userToken: string = sign(
      { id: userId },
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
  }

  generateLogoutToken(userId: ObjectId, res: Response): string {
    const token: string = sign({ id: userId }, jwtConfig.secret as Secret, {
      expiresIn: "1s",
    });

    res.cookie("jwt", "", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    return token;
  }
}
