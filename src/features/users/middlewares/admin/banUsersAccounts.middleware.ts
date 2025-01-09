import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { IUser, Roles } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";

export class BanUserAccountMiddleware {}
