import { Request, Response } from "express";

// Utils imports
import { catchAsync } from "@utils/index";

export class AccountActivationStatusController {
  /**
   * Activates a user account.
   * Marks the account as active, allowing the user to access the system.
   */
  static activate = catchAsync(async (req: Request, res: Response) => {
    // Implementation for activation
  });

  /**
   * Deactivates a user account.
   * Marks the account as inactive, restricting the user's access to the system.
   */
  static deactivate = catchAsync(async (req: Request, res: Response) => {
    // Implementation for deactivation
  });
}
