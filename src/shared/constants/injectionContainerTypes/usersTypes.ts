export const USERS_TYPES = {
  USER_MODEL: Symbol.for("UserModel"),
  LockAccountsController: Symbol.for("LockAccountsController"),
  LockAccountService: Symbol.for("LockAccountService"),
  BanUsersAccountsController: Symbol.for("BanUsersAccountsController"),
  BanUserAccountService: Symbol.for("BanUserAccountService"),
  RolesManagementController: Symbol.for("RolesManagementController"),
  RolesManagementService: Symbol.for("RolesManagementService"),
  UsersCrudController: Symbol.for("UsersCrudController"),
  UsersCrudService: Symbol.for("UsersCrudService"),
  AccountDeletionController: Symbol.for("AccountDeletionController"),
  AccountDeletionService: Symbol.for("AccountDeletionService"),
  AccountEmailController: Symbol.for("AccountEmailController"),
  AccountEmailService: Symbol.for("AccountEmailService"),
  AccountNotificationController: Symbol.for("AccountNotificationController"),
  AccountNotificationService: Symbol.for("AccountNotificationService"),
  AccountPasswordManagementController: Symbol.for(
    "AccountPasswordManagementController"
  ),
  AccountPasswordManagementService: Symbol.for(
    "AccountPasswordManagementService"
  ),
  AccountStatusController: Symbol.for("AccountStatusController"),
  AccountStatusService: Symbol.for("AccountStatusService"),
  ProfileController: Symbol.for("ProfileController"),
  ProfileService: Symbol.for("ProfileService"),
  UserAuthRepository: Symbol.for("UserAuthRepository"),
  UserManagementRepository: Symbol.for("UserManagementRepository"),
  UserSelfRepository: Symbol.for("UserSelfRepository"),
  BanUserAccountMiddleware: Symbol.for("BanUserAccountMiddleware"),
  LockUserAccountMiddleware: Symbol.for("LockUserAccountMiddleware"),
  RolesManagementMiddleware: Symbol.for("RolesManagementMiddleware"),
  AccountDeletionMiddleware: Symbol.for("AccountDeletionMiddleware"),
  AccountEmailMiddleware: Symbol.for("AccountEmailMiddleware"),
  AccountNotificationMiddleware: Symbol.for("AccountNotificationMiddleware"),
  AccountPasswordManagementMiddleware: Symbol.for(
    "AccountPasswordManagementMiddleware"
  ),
  AccountStatusMiddleware: Symbol.for("AccountStatusMiddleware"),
  ProfileMiddleware: Symbol.for("ProfileMiddleware"),
};
