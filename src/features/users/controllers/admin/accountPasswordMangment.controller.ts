import { Request, Response } from "express";

// Utils imports
import { catchAsync } from "@utils/index";

export class AccountPasswordManagementController {
  // change user account password
  static changePassword = catchAsync(async (req: Request, res: Response) => {});

  // reset user password
  static resetPassword = catchAsync(async (req: Request, res: Response) => {});
}
