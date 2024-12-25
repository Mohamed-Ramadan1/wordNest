import { IUser } from "@features/users";
import { IFieldsToBeUpdates } from "@features/users/dtos/users.dto";
import { Request } from "express";

// Declare module to extend Express.Request interface
declare global {
  namespace Express {
    export interface Request {
      profileInformationToUpdate: IFieldsToBeUpdates;
    }
  }
}
