// packages imports
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// models imports
import ContentReportingModel from "../models/contentReporting.model";

// interfaces imports
import {
  IContentReportRepository,
  IContentReporting,
  IContentReportingCRUDMiddleware,
  IContentReportingCRUDService,
  IContentReportingManagementMiddleware,
  IContentReportingManagementService,
} from "../interfaces/index";

// repositories imports
import { ContentReportRepository } from "../repositories/contentReport.repository";

// middlewares imports
import { ContentReportingCRUDMiddleware } from "../middlewares/contentReportingCRUD.middleware";
import { ContentReportingManagementMiddleware } from "../middlewares/contentReportingManagement.middleware";

// services imports
import { ContentReportingCRUDService } from "../services/contentReportingCRUD.service";
import { ContentReportingManagementService } from "../services/contentReportingManagement.service";

// controllers imports
import { ContentReportingCRUDController } from "../controllers/contentReportingCRUD.controller";
import { ContentReportingManagementController } from "../controllers/contentReportingManagement.controller";

/**
 * This module encapsulates the bindings for the Content reporting feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // model binding
  bind<Model<IContentReporting>>(TYPES.ContentReportingModel).toConstantValue(
    ContentReportingModel
  );

  // Binding the services
  bind<IContentReportingManagementService>(
    TYPES.ContentReportingManagementService
  )
    .to(ContentReportingManagementService)
    .inSingletonScope();

  bind<IContentReportingCRUDService>(TYPES.ContentReportingCRUDService)
    .to(ContentReportingCRUDService)
    .inSingletonScope();

  // Binding the repositories
  bind<IContentReportRepository>(TYPES.ContentReportRepository)
    .to(ContentReportRepository)
    .inSingletonScope();
  // Binding the middlewares
  bind<IContentReportingManagementMiddleware>(
    TYPES.ContentReportingManagementMiddleware
  )
    .to(ContentReportingManagementMiddleware)
    .inSingletonScope();
  bind<IContentReportingCRUDMiddleware>(TYPES.ContentReportingCRUDMiddleware)
    .to(ContentReportingCRUDMiddleware)
    .inSingletonScope();
  // Binding the controllers
  bind<ContentReportingManagementController>(
    TYPES.ContentReportingManagementController
  )
    .to(ContentReportingManagementController)
    .inSingletonScope();
  bind<ContentReportingCRUDController>(TYPES.ContentReportingCRUDController)
    .to(ContentReportingCRUDController)
    .inSingletonScope();
});
