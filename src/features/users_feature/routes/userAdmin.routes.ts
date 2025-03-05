//! You will find the routes at the path of     (src/userFeatureRoutes/userAdmin.ts)
//! and the reason of this wired behavior you will find file called important.txt contains the reason explained there .
// import { Router } from "express";
// import { protect, restrictTo } from "@shared/index";
// import { container } from "@config/inversify.config";
// console.log(container, "i am from the router file ");
// // middleware imports
// import { RolesManagementMiddleware } from "../middlewares/admin/rolesManagement.middleware";
// import { LockUserAccountMiddleware } from "../middlewares/admin/locAccounts.middleware";
// import { BanUserAccountMiddleware } from "../middlewares/admin/banUsersAccounts.middleware";

// // controllers imports
// import { UsersCrudController } from "../controllers/admin/usersCrud.controller";
// import { RolesManagementController } from "../controllers/admin/roleManagement.controller";
// import { LockAccountsController } from "../controllers/admin/locAccounts.controller";
// import { BanUsersAccountsController } from "../controllers/admin/banUsersAccounts.controller";

// // Instantiate controller
// const usersCrudController = new UsersCrudController();
// const rolesManagementController = new RolesManagementController();
// const lockAccountsController = new LockAccountsController();
// const banUsersAccountsController = new BanUsersAccountsController();

// const router: Router = Router();

// // Get all users
// router.use(protect);
// router.use(restrictTo("admin"));
// router
//   .route("/")
//   .get(usersCrudController.getUsers)
//   .post(usersCrudController.createUser);

// // Get user by id
// router
//   .route("/:id")
//   .get(usersCrudController.getUser)
//   .patch(usersCrudController.updateUser)
//   .delete(usersCrudController.deleteUser);

// // roles route related end points
// // list user roles
// router
//   .route("/:userId/roles")
//   .get(
//     RolesManagementMiddleware.validateRequestParams,
//     rolesManagementController.listUserRoles
//   );

// // add role to user
// router
//   .route("/:userId/assign-role")
//   .post(
//     RolesManagementMiddleware.validateRequestParams,
//     RolesManagementMiddleware.validateAddRoleToUser,
//     rolesManagementController.assignRoleToUser
//   );

// // remove role from user
// router
//   .route("/:userId/remove-role")
//   .delete(
//     RolesManagementMiddleware.validateRequestParams,
//     RolesManagementMiddleware.validateRemoveRoleFromUser,
//     rolesManagementController.removeRoleFromUser
//   );

// // reset all user roles let only the default role(user)
// router
//   .route("/:userId/reset-roles")
//   .patch(rolesManagementController.resetUserRoles);

// // Lock the user account related routes

// // lock user account
// router
//   .route("/:userId/lock-account")
//   .patch(
//     LockUserAccountMiddleware.validateLockAccount,
//     lockAccountsController.lockAccount
//   );

// // unlock user account
// router
//   .route("/:userId/unlock-account")
//   .patch(
//     LockUserAccountMiddleware.validateUnlockAccount,
//     lockAccountsController.unlockAccount
//   );

// // Ban accounts related routes
// // ban user account
// router
//   .route("/:userId/ban-account")
//   .patch(
//     BanUserAccountMiddleware.validateBanUserAccount,
//     banUsersAccountsController.banUserAccount
//   );

// // un-ban user account
// router
//   .route("/:userId/unban-account")
//   .patch(
//     BanUserAccountMiddleware.validateUnBanUserAccount,
//     banUsersAccountsController.unBanUserAccount
//   );

// // Export the router module
// export default router;
