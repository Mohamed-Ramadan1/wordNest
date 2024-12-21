// Auth controller interface.

import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  socialRegister: (req: Request, res: Response, next: NextFunction) => void;
  emailRegister: (req: Request, res: Response, next: NextFunction) => void;
  emailLogin: (req: Request, res: Response, next: NextFunction) => void;
  logout: (req: Request, res: Response, next: NextFunction) => void;
}
