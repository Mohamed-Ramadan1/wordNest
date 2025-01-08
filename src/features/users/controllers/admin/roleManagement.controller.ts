import { Request, Response } from "express";

// Utils imports
import { catchAsync } from "@utils/index";
import { RolesManagementService } from "@features/users/services/admin/rolesManagementS.service";

// shard imports
import { ApiResponse } from "@shared/index";

// utils imports
import { sendResponse } from "@utils/index";

export class RolesManagementController {
  /**
   * Assigns a role to a user.
   * Adds a specific role to a user based on their ID.
   */
  public assignRoleToUser = catchAsync(async (req: Request, res: Response) => {
    await RolesManagementService.addRoleToUser(
      req.userToBeAssigned,
      req.body.role
    );
    const response: ApiResponse<null> = {
      status: "success",
      message: "Role assigned to user successfully",
    };
    sendResponse(200, res, response);
  });

  /**
   * Removes a role from a user.
   * Deletes a specific role assigned to a user based on their ID.
   */
  public removeRoleFromUser = catchAsync(
    async (req: Request, res: Response) => {
      await RolesManagementService.removeRoleFromUser(
        req.userToBeAssigned,
        req.body.role
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Role removed from user successfully",
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Lists all roles assigned to a user.
   * Retrieves all roles currently associated with a user.
   */
  public listUserRoles = catchAsync(async (req: Request, res: Response) => {
    const { roles, userEmail } = await RolesManagementService.listUserRoles(
      req.params.userId
    );
    const response: ApiResponse<string[] | string> = {
      status: "success",
      message: "Roles retrieved successfully",
      data: {
        userEmail,
        roles,
      },
    };
    sendResponse(200, res, response);
  });

  /**
   * Resets all roles assigned to a user.
   * Removes all roles currently associated with a user.
   */
  public resetUserRoles = catchAsync(async (req: Request, res: Response) => {
    await RolesManagementService.resetUserRoles(req.params.userId);
    const response: ApiResponse<null> = {
      status: "success",
      message:
        "Roles reset successfully. now user has only default role (user )",
    };
    sendResponse(200, res, response);
  });
}
