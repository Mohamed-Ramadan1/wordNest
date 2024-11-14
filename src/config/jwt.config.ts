import dotenv from "dotenv";
// Load environment variables
dotenv.config();

export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

interface IJwtConfig {
  secret: string;
  expiresIn: string;
  logOutExpiredIn: string;
  cookieExpiredIn: string | "0";
  environment: Environment;
}

export const jwtConfig: IJwtConfig = {
  secret: process.env.JWT_SECRET as string,
  expiresIn: process.env.JWT_EXPIRES_IN as string,
  logOutExpiredIn: process.env.JWT_LOGOUT_EXPIRES_IN as string,
  cookieExpiredIn: process.env.JWT_COOKIE_EXPIRES_IN as string,
  environment: process.env.NODE_ENV as Environment,
};
