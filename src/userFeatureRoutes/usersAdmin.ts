import { Router } from "express";
import { protect, restrictTo, TYPES } from "@shared/index";
import { container } from "@config/inversify.config";

// middleware imports
import { RolesManagementMiddleware } from "@features/users/middlewares/admin/rolesManagement.middleware";
import { LockUserAccountMiddleware } from "@features/users/middlewares/admin/locAccounts.middleware";
import { BanUserAccountMiddleware } from "@features/users/middlewares/admin/banUsersAccounts.middleware";

// controllers imports
import { UsersCrudController } from "@features/users/controllers/admin/usersCrud.controller";
import { RolesManagementController } from "@features/users/controllers/admin/roleManagement.controller";
import { LockAccountsController } from "@features/users/controllers/admin/locAccounts.controller";
import { BanUsersAccountsController } from "@features/users/controllers/admin/banUsersAccounts.controller";

// Instantiate controller
const usersCrudController = container.get<UsersCrudController>(
  TYPES.UsersCrudController
);
const rolesManagementController = container.get<RolesManagementController>(
  TYPES.RolesManagementController
);
const lockAccountsController = container.get<LockAccountsController>(
  TYPES.LockAccountsController
);
const banUsersAccountsController = container.get<BanUsersAccountsController>(
  TYPES.BanUsersAccountsController
);

// middleware creation for using container
const rolesManagementMiddleware = container.get<RolesManagementMiddleware>(
  TYPES.RolesManagementMiddleware
);
const lockUserAccountMiddleware = container.get<LockUserAccountMiddleware>(
  TYPES.LockUserAccountMiddleware
);

const banUserAccountMiddleware = container.get<BanUserAccountMiddleware>(
  TYPES.BanUserAccountMiddleware
);

const router: Router = Router();

// Get all users
router.use(protect);
router.use(restrictTo("admin"));
router
  .route("/")
  .get(usersCrudController.getUsers)
  .post(usersCrudController.createUser);

// Get user by id
router
  .route("/:id")
  .get(usersCrudController.getUser)
  .patch(usersCrudController.updateUser)
  .delete(usersCrudController.deleteUser);

// roles route related end points
// list user roles
router.route("/:userId/roles").get(rolesManagementController.listUserRoles);

// add role to user
router
  .route("/:userId/assign-role")
  .post(
    rolesManagementMiddleware.validateRequestParams,
    rolesManagementMiddleware.validateAddRoleToUser,
    rolesManagementController.assignRoleToUser
  );

// remove role from user
router
  .route("/:userId/remove-role")
  .delete(
    rolesManagementMiddleware.validateRequestParams,
    rolesManagementMiddleware.validateRemoveRoleFromUser,
    rolesManagementController.removeRoleFromUser
  );

// reset all user roles let only the default role(user)
router
  .route("/:userId/reset-roles")
  .patch(rolesManagementController.resetUserRoles);

// Lock the user account related routes

// lock user account
router
  .route("/:userId/lock-account")
  .patch(
    lockUserAccountMiddleware.validateLockAccount,
    lockAccountsController.lockAccount
  );

// unlock user account
router
  .route("/:userId/unlock-account")
  .patch(
    lockUserAccountMiddleware.validateUnlockAccount,
    lockAccountsController.unlockAccount
  );

// Ban accounts related routes
// ban user account
router
  .route("/:userId/ban-account")
  .patch(
    banUserAccountMiddleware.validateBanUserAccount,
    banUsersAccountsController.banUserAccount
  );

// un-ban user account
router
  .route("/:userId/unban-account")
  .patch(
    banUserAccountMiddleware.validateUnBanUserAccount,
    banUsersAccountsController.unBanUserAccount
  );

// Export the router module
export default router;
