import { Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Shard imports
import { catchAsync, sendResponse, ApiResponse, TYPES } from "@shared/index";

// interfaces imports
import {
  IRolesManagementService,
  RolesManagementRequestParams,
} from "../../interfaces/index";

@injectable()
export class RolesManagementController {
  private rolesManagementService: IRolesManagementService;
  constructor(
    @inject(TYPES.RolesManagementService)
    rolesManagementService: IRolesManagementService
  ) {
    this.rolesManagementService = rolesManagementService;
  }
  /**
   * Assigns a role to a user.
   * Adds a specific role to a user based on their ID.
   */
  public assignRoleToUser = catchAsync(async (req: Request, res: Response) => {
    await this.rolesManagementService.addRoleToUser(
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
      await this.rolesManagementService.removeRoleFromUser(
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
  public listUserRoles = catchAsync(
    async (req: Request<RolesManagementRequestParams>, res: Response) => {
      const { roles, userEmail } =
        await this.rolesManagementService.listUserRoles(req.params.userId);
      const response: ApiResponse<string[] | string> = {
        status: "success",
        message: "Roles retrieved successfully",
        data: {
          userEmail,
          roles,
        },
      };
      sendResponse(200, res, response);
    }
  );

  /**
   * Resets all roles assigned to a user.
   * Removes all roles currently associated with a user.
   */
  public resetUserRoles = catchAsync(
    async (req: Request<RolesManagementRequestParams>, res: Response) => {
      await this.rolesManagementService.resetUserRoles(req.params.userId);
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Roles reset successfully. now user has only default role (user )",
      };
      sendResponse(200, res, response);
    }
  );
}
