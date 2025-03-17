import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";
import { Model } from "mongoose";

import { ReadingListModel } from "../models/readingList.model";
// controller imports
import { ReadingListCRUDController } from "../controllers/readingListCRUD.controller";
import { ReadingListManagementController } from "../controllers/readingListManagement.controller";
import { ReadingListSettingsController } from "../controllers/readingListSettings.controller";

// service imports
import { ReadingListCRUDService } from "../services/readingListCRUD.service";
import { ReadingListManagementService } from "../services/readingListManagement.service";
import { ReadingListSettingsService } from "../services/readingListSettings.service";

// middlewares imports
import { ReadingListCRUDMiddleware } from "../middlewares/readingListCRUD.middleware";
import { ReadingListSettingsMiddleware } from "../middlewares/readingListSettings.middleware";

// interface imports
import {
  IReadingListCRUDService,
  IReadingListManagementService,
  IReadingListSettingsService,
  IReadingListCRUDMiddleware,
  IReadingListSettingsMiddleware,
  IReadingList,
} from "../interfaces/index";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Binding the mongoose model to its interface
  bind<Model<IReadingList>>(TYPES.ReadingListModel).toConstantValue(
    ReadingListModel
  );

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

  // Binding the middlewares
  bind<IReadingListCRUDMiddleware>(TYPES.ReadingListCRUDMiddleware)
    .to(ReadingListCRUDMiddleware)
    .inSingletonScope();

  bind<IReadingListSettingsMiddleware>(TYPES.ReadingListSettingsMiddleware)
    .to(ReadingListSettingsMiddleware)
    .inSingletonScope();
});
