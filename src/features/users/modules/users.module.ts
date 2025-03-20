import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";
import { Model } from "mongoose";

// repository imports
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { UserManagementRepository } from "../repositories/userManagement.repository";
import { UserSelfRepository } from "../repositories/userSelf.repository";

// services imports
import { BanUserAccountService } from "../services/admin/banUsersAccounts.service";
import { LockAccountService } from "../services/admin/locAccounts.service";
import { RolesManagementService } from "../services/admin/rolesManagementS.service";
import { UsersCrudService } from "../services/admin/usersCrud.service";
import { AccountDeletionService } from "../services/users/accountDeletion.service";
import { AccountEmailService } from "../services/users/accountEmail.service";
import { AccountNotificationService } from "../services/users/accountNotification.service";
import { AccountPasswordManagementService } from "../services/users/accountPasswordManagement.service";
import { AccountStatusService } from "../services/users/accountStatus.service";
import { ProfileService } from "../services/users/profile.service";

// controllers imports
import { BanUsersAccountsController } from "../controllers/admin/banUsersAccounts.controller";
import { LockAccountsController } from "../controllers/admin/locAccounts.controller";
import { RolesManagementController } from "../controllers/admin/roleManagement.controller";
import { UsersCrudController } from "../controllers/admin/usersCrud.controller";
import { AccountDeletionController } from "../controllers/users/accountDeletion.controller";
import { AccountEmailController } from "../controllers/users/accountEmail.controller";
import { AccountNotificationController } from "../controllers/users/accountNotification.controller";
import { AccountPasswordManagementController } from "../controllers/users/accountPasswordManagement.controller";
import { AccountStatusController } from "../controllers/users/accountStatus.controller";
import { ProfileController } from "../controllers/users/profile.controller";

// middleware imports
import { BanUserAccountMiddleware } from "../middlewares/admin/banUsersAccounts.middleware";
import { LockUserAccountMiddleware } from "../middlewares/admin/locAccounts.middleware";
import { RolesManagementMiddleware } from "../middlewares/admin/rolesManagement.middleware";

import { AccountDeletionMiddleware } from "../middlewares/users/accountDeletion.middleware";
import { AccountEmailMiddleware } from "../middlewares/users/accountEmail.middleware";
import { AccountNotificationMiddleware } from "../middlewares/users/accountNotification.middleware";
import { AccountPasswordManagementMiddleware } from "../middlewares/users/accountPasswordManagement.middleware";
import { AccountStatusMiddleware } from "../middlewares/users/accountStatus.middleware";
import { ProfileMiddleware } from "../middlewares/users/profile.middleware";

// models imports
import UserModel from "../models/user.model";

// interfaces imports
import {
  IBanUserAccountService,
  IAccountDeletionService,
  IAccountEmailService,
  IAccountNotificationService,
  IAccountPasswordManagementService,
  IAccountStatusService,
  ILockAccountService,
  IProfileService,
  IRolesManagementService,
  IUsersCrudService,
  IUserAuthRepository,
  IUserManagementRepository,
  IUserSelfRepository,
  IUser,
  IAccountDeletionMiddleware,
  IAccountEmailMiddleware,
  IAccountNotificationMiddleware,
  IAccountPasswordManagementMiddleware,
  IBanUserAccountMiddleware,
  IAccountStatusMiddleware,
  ILockUserAccountMiddleware,
  IRolesManagementMiddleware,
  IProfileMiddleware,
} from "../interfaces/index";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the user model
  bind<Model<IUser>>(TYPES.USER_MODEL).toConstantValue(UserModel);

  // Binding the services
  bind<IBanUserAccountService>(TYPES.BanUserAccountService)
    .to(BanUserAccountService)
    .inSingletonScope();
  bind<ILockAccountService>(TYPES.LockAccountService)
    .to(LockAccountService)
    .inSingletonScope();
  bind<IRolesManagementService>(TYPES.RolesManagementService)
    .to(RolesManagementService)
    .inSingletonScope();
  bind<IUsersCrudService>(TYPES.UsersCrudService)
    .to(UsersCrudService)
    .inSingletonScope();
  bind<IAccountDeletionService>(TYPES.AccountDeletionService)
    .to(AccountDeletionService)
    .inSingletonScope();
  bind<IAccountEmailService>(TYPES.AccountEmailService)
    .to(AccountEmailService)
    .inSingletonScope();
  bind<IAccountNotificationService>(TYPES.AccountNotificationService)
    .to(AccountNotificationService)
    .inSingletonScope();
  bind<IAccountPasswordManagementService>(
    TYPES.AccountPasswordManagementService
  )
    .to(AccountPasswordManagementService)
    .inSingletonScope();
  bind<IAccountStatusService>(TYPES.AccountStatusService)
    .to(AccountStatusService)
    .inSingletonScope();
  bind<IProfileService>(TYPES.ProfileService)
    .to(ProfileService)
    .inSingletonScope();
  // Binding the controllers
  bind<BanUsersAccountsController>(TYPES.BanUsersAccountsController)
    .to(BanUsersAccountsController)
    .inSingletonScope();
  bind<LockAccountsController>(TYPES.LockAccountsController)
    .to(LockAccountsController)
    .inSingletonScope();
  bind<RolesManagementController>(TYPES.RolesManagementController)
    .to(RolesManagementController)
    .inSingletonScope();
  bind<UsersCrudController>(TYPES.UsersCrudController)
    .to(UsersCrudController)
    .inSingletonScope();
  bind<AccountDeletionController>(TYPES.AccountDeletionController)
    .to(AccountDeletionController)
    .inSingletonScope();
  bind<AccountEmailController>(TYPES.AccountEmailController)
    .to(AccountEmailController)
    .inSingletonScope();
  bind<AccountNotificationController>(TYPES.AccountNotificationController)
    .to(AccountNotificationController)
    .inSingletonScope();
  bind<AccountPasswordManagementController>(
    TYPES.AccountPasswordManagementController
  )
    .to(AccountPasswordManagementController)
    .inSingletonScope();
  bind<AccountStatusController>(TYPES.AccountStatusController)
    .to(AccountStatusController)
    .inSingletonScope();
  bind<ProfileController>(TYPES.ProfileController)
    .to(ProfileController)
    .inSingletonScope();

  // Binding the repositories
  bind<IUserAuthRepository>(TYPES.UserAuthRepository)
    .to(UserAuthRepository)
    .inSingletonScope();
  bind<IUserManagementRepository>(TYPES.UserManagementRepository)
    .to(UserManagementRepository)
    .inSingletonScope();
  bind<IUserSelfRepository>(TYPES.UserSelfRepository)
    .to(UserSelfRepository)
    .inSingletonScope();

  // Binding the middlewares
  bind<IBanUserAccountMiddleware>(TYPES.BanUserAccountMiddleware)
    .to(BanUserAccountMiddleware)
    .inSingletonScope();
  bind<ILockUserAccountMiddleware>(TYPES.LockUserAccountMiddleware)
    .to(LockUserAccountMiddleware)
    .inSingletonScope();
  bind<IRolesManagementMiddleware>(TYPES.RolesManagementMiddleware)
    .to(RolesManagementMiddleware)
    .inSingletonScope();
  bind<IAccountDeletionMiddleware>(TYPES.AccountDeletionMiddleware)
    .to(AccountDeletionMiddleware)
    .inSingletonScope();
  bind<IAccountEmailMiddleware>(TYPES.AccountEmailMiddleware)
    .to(AccountEmailMiddleware)
    .inSingletonScope();
  bind<IAccountNotificationMiddleware>(TYPES.AccountNotificationMiddleware)
    .to(AccountNotificationMiddleware)
    .inSingletonScope();
  bind<IAccountPasswordManagementMiddleware>(
    TYPES.AccountPasswordManagementMiddleware
  )
    .to(AccountPasswordManagementMiddleware)
    .inSingletonScope();
  bind<IAccountStatusMiddleware>(TYPES.AccountStatusMiddleware)
    .to(AccountStatusMiddleware)
    .inSingletonScope();
  bind<IProfileMiddleware>(TYPES.ProfileMiddleware)
    .to(ProfileMiddleware)
    .inSingletonScope();
});
