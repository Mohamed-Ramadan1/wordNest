import { IUser } from "@features/users";
import { IFieldsToBeUpdates } from "@features/users/interfaces/fieldsToBeUpdate.interface";
import { Request } from "express";

// Declare module to extend Express.Request interface
declare global {
  namespace Express {
    export interface Request {
      body: {
        currentPassword: string;
      };
      profileInformationToUpdate: IFieldsToBeUpdates;
    }
  }
}
