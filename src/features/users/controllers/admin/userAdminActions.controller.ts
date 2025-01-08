import { Request, Response } from "express";

// Utils imports
import { catchAsync } from "@utils/index";

export class UserAdminActionsController {
  // activate user account
  static activate = catchAsync(async (req: Request, res: Response) => {});

  // deactivate user account
  static deactivate = catchAsync(async (req: Request, res: Response) => {});

  // ban user
  static banUser = catchAsync(async (req: Request, res: Response) => {});

  // unban user
  static unbanUser = catchAsync(async (req: Request, res: Response) => {});

  // get user stats
  static getUserStats = catchAsync(async (req: Request, res: Response) => {});
}
