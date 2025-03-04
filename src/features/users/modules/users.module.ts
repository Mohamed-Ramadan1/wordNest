import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/types/containerTypes";

import { ILockAccountService } from "../interfaces/locAccountService.interface";

import { LockAccountService } from "../services/admin/locAccounts.service";

import { LockAccountsController } from "../controllers/admin/locAccounts.controller";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the repository to its interface
  // bind<ILockAccountService>(TYPES.LockAccountService)
  //   .to(LockAccountService)
  //   .inSingletonScope();
  // bind<LockAccountsController>(TYPES.LockAccountsController)
  //   .to(LockAccountsController)
  //   .inSingletonScope();
});
