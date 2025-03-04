import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/types/containerTypes";

// controller imports
import { ReadingListCRUDController } from "../controllers/readingListCRUD.controller";
import { ReadingListManagementController } from "../controllers/readingListManagement.controller";
import { ReadingListSettingsController } from "../controllers/readingListSettings.controller";

// service imports
import { ReadingListCRUDService } from "../services/readingListCRUD.service";
import { ReadingListManagementService } from "../services/readingListManagement.service";
import { ReadingListSettingsService } from "../services/readingListSettings.service";

// interface imports
import { IReadingListCRUDService } from "../interfaces/readingListCRUDService.interface";
import { IReadingListManagementService } from "../interfaces/readingListManagementService.interface";
import { IReadingListSettingsService } from "../interfaces/readingListSettingsService.interface";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the service to its interface
  bind<IReadingListCRUDService>(TYPES.ReadingListCRUDService)
    .to(ReadingListCRUDService)
    .inSingletonScope();

  bind<IReadingListManagementService>(TYPES.ReadingListManagementService)
    .to(ReadingListManagementService)
    .inSingletonScope();

  bind<IReadingListSettingsService>(TYPES.ReadingListSettingsService)
    .to(ReadingListSettingsService)
    .inSingletonScope();

  // Binding the controller to its interface
  bind<ReadingListCRUDController>(TYPES.ReadingListCRUDController)
    .to(ReadingListCRUDController)
    .inSingletonScope();

  bind<ReadingListManagementController>(TYPES.ReadingListManagementController)
    .to(ReadingListManagementController)
    .inSingletonScope();

  bind<ReadingListSettingsController>(TYPES.ReadingListSettingsController)
    .to(ReadingListSettingsController)
    .inSingletonScope();
});
