import { Router } from "express";
import { protect, restrictTo, TYPES } from "@shared/index";
import { container } from "@config/inversify.config";

// middleware imports
import { RolesManagementMiddleware } from "@features/users_feature/middlewares/admin/rolesManagement.middleware";
import { LockUserAccountMiddleware } from "@features/users_feature/middlewares/admin/locAccounts.middleware";
import { BanUserAccountMiddleware } from "@features/users_feature/middlewares/admin/banUsersAccounts.middleware";

// controllers imports
import { UsersCrudController } from "@features/users_feature/controllers/admin/usersCrud.controller";
import { RolesManagementController } from "@features/users_feature/controllers/admin/roleManagement.controller";
import { LockAccountsController } from "@features/users_feature/controllers/admin/locAccounts.controller";
import { BanUsersAccountsController } from "@features/users_feature/controllers/admin/banUsersAccounts.controller";

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
    RolesManagementMiddleware.validateRequestParams,
    RolesManagementMiddleware.validateAddRoleToUser,
    rolesManagementController.assignRoleToUser
  );

// remove role from user
router
  .route("/:userId/remove-role")
  .delete(
    RolesManagementMiddleware.validateRequestParams,
    RolesManagementMiddleware.validateRemoveRoleFromUser,
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
    LockUserAccountMiddleware.validateLockAccount,
    lockAccountsController.lockAccount
  );

// unlock user account
router
  .route("/:userId/unlock-account")
  .patch(
    LockUserAccountMiddleware.validateUnlockAccount,
    lockAccountsController.unlockAccount
  );

// Ban accounts related routes
// ban user account
router
  .route("/:userId/ban-account")
  .patch(
    BanUserAccountMiddleware.validateBanUserAccount,
    banUsersAccountsController.banUserAccount
  );

// un-ban user account
router
  .route("/:userId/unban-account")
  .patch(
    BanUserAccountMiddleware.validateUnBanUserAccount,
    banUsersAccountsController.unBanUserAccount
  );

// Export the router module
export default router;
