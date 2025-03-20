import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";
import {
  IAuthRepository,
  IAccountRecoveryService,
  IAuthService,
  IAuthMiddleware,
  IAccountRecoveryMiddleware,
} from "../interfaces/index";

// Service imports
import AccountRecoveryService from "../services/accountRecovery.service";
import AuthService from "../services/auth.service";

// Controller imports
import AccountRecoveryController from "../controllers/accountRecovery.controller";
import AuthController from "../controllers/auth.controller";

// Repository imports
import { AuthRepository } from "../repositories/auth.repository";

// middleware imports
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AccountRecoveryMiddleware } from "../middlewares/accountRecovery.middleware";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the repository to its interface
  bind<IAuthRepository>(TYPES.AuthRepository)
    .to(AuthRepository)
    .inSingletonScope();

  // Binding the service to its interface
  bind<IAuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
  bind<IAccountRecoveryService>(TYPES.AccountRecoveryService)
    .to(AccountRecoveryService)
    .inSingletonScope();

  // Binding the controllers
  bind<AuthController>(TYPES.AuthController)
    .to(AuthController)
    .inSingletonScope();
  bind<AccountRecoveryController>(TYPES.AccountRecoveryController)
    .to(AccountRecoveryController)
    .inSingletonScope();

  // Binding the middleware
  bind<IAuthMiddleware>(TYPES.AuthMiddleware)
    .to(AuthMiddleware)
    .inSingletonScope();

  bind<IAccountRecoveryMiddleware>(TYPES.AccountRecoveryMiddleware)
    .to(AccountRecoveryMiddleware)
    .inSingletonScope();
});
