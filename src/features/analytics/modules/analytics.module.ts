// packages imports
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import { IAnalyticsRepository, IAnalyticsService } from "../interfaces/index";

// repositories imports
import { AnalyticsRepository } from "../repositories/analytics.repository";

// services imports
import { AnalyticsService } from "../services/analytics.service";

// controllers imports
import { AnalyticsController } from "../controllers/analytics.controller";

/**
 * This module encapsulates the bindings for the Content reporting feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Bind the AnalyticsController to the container
  bind<AnalyticsController>(TYPES.AnalyticsController).to(AnalyticsController);

  // Bind the AnalyticsService to the container
  bind<IAnalyticsService>(TYPES.AnalyticsService).to(AnalyticsService);

  // Bind the AnalyticsRepository to the container
  bind<IAnalyticsRepository>(TYPES.AnalyticsRepository).to(AnalyticsRepository);
});
