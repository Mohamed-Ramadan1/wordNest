import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "@features/users/dtos/changePassword.dto";
import { validateDto } from "@utils/validate.dto";
import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";

export class AccountStatusMiddleware {}
