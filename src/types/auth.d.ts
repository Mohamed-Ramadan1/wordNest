import { IUser } from "@features/users";
import { Request } from "express";

// Declare module to extend Express.Request interface
declare global {
  namespace Express {
    export interface Request {
      user?: IUser; // Optional, since not all requests have a user
      headers: {
        authorization?: string; // Optional, since not all requests have an authorization header
      };
      body: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        newPassword?: string;
        confirmNewPassword?: string;
      };
    }
  }
}
