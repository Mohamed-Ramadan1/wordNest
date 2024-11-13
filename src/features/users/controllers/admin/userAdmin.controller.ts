//! This file will be refactored before start adding the logic for this part

import { Request, Response, NextFunction } from "express";
// Models imports
import UserModel from "../../models/user.model";

// Utils imports
import { AppError, catchAsync } from "@utils/index";

export default class UserAdminController {
  // get all users
  static getUsers = catchAsync(async (req: Request, res: Response) => {});

  // get user by id
  static getUser = catchAsync(async (req: Request, res: Response) => {});

  // create user
  static create = catchAsync(async (req: Request, res: Response) => {});

  // update user
  static update = catchAsync(async (req: Request, res: Response) => {});

  // delete user
  static delete = catchAsync(async (req: Request, res: Response) => {});

  // activate user account
  static activate = catchAsync(async (req: Request, res: Response) => {});

  // deactivate user account
  static deactivate = catchAsync(async (req: Request, res: Response) => {});

  // remove role from user
  static removeRoleFromUser = catchAsync(
    async (req: Request, res: Response) => {}
  );

  // assign role to user
  static assignRoleToUser = catchAsync(
    async (req: Request, res: Response) => {}
  );

  // change user account password
  static changePassword = catchAsync(async (req: Request, res: Response) => {});

  // list available roles
  static listRoles = catchAsync(async (req: Request, res: Response) => {});

  // get user by email
  static getUserByEmail = catchAsync(async (req: Request, res: Response) => {});

  // reset user password
  static resetPassword = catchAsync(async (req: Request, res: Response) => {});

  // ban user
  static banUser = catchAsync(async (req: Request, res: Response) => {});

  // get user stats
  static getUserStats = catchAsync(async (req: Request, res: Response) => {});
}
