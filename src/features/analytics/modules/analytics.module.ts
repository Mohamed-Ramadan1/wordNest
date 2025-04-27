// packages imports
import { ContainerModule, interfaces } from "inversify";
import { Model } from "mongoose";

// shard imports
import { TYPES } from "@shared/index";

// interfaces imports
import {
  IAnalyticsRepository,
  IAnalyticsService,
  IBlogsCollectionAnalytics,
  IContentReportingCollectionAnalytics,
  ISupportTicketsCollectionAnalytics,
  IUsersCollectionAnalytics,
  IAnalyticsReportsRepository,
  IAnalyticsReportsService,
} from "../interfaces/index";

// repositories imports
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { AnalyticsReportsRepository } from "../repositories/analyticsReporting.repository";

// services imports
import { AnalyticsService } from "../services/analytics.service";
import { AnalyticsReportsService } from "../services/analyticsReports.service";

// controllers imports
import { AnalyticsController } from "../controllers/analytics.controller";
import { AnalyticsReportsController } from "../controllers/analyticsReports.controller";

// models imports
import { BlogsCollectionAnalyticsModel } from "../models/blogCollectionAnalytics.model";
import { UsersCollectionAnalyticsModel } from "../models/usersCollectionAnalytics.model";
import { SupportTicketsCollectionAnalyticsModel } from "../models/supportTicketsCollectionAnalytics.model";
import { ContentReportingCollectionAnalyticsModel } from "../models/contentReportingCollectionAnalytics.model";

/**
 * This module encapsulates the bindings for the Content reporting feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // Bind the AnalyticsController to the container
  bind<AnalyticsController>(TYPES.AnalyticsController)
    .to(AnalyticsController)
    .inSingletonScope();

  // Bind the AnalyticsService to the container
  bind<IAnalyticsService>(TYPES.AnalyticsService)
    .to(AnalyticsService)
    .inSingletonScope();

  // Bind the AnalyticsRepository to the container
  bind<IAnalyticsRepository>(TYPES.AnalyticsRepository)
    .to(AnalyticsRepository)
    .inSingletonScope();
  // Bind the AnalyticsReportsController to the container
  bind<AnalyticsReportsController>(TYPES.AnalyticsReportsController).to(
    AnalyticsReportsController
  );

  // Bind the AnalyticsReportsService to the container
  bind<IAnalyticsReportsService>(TYPES.AnalyticsReportsService)
    .to(AnalyticsReportsService)
    .inSingletonScope();

  // Bind the AnalyticsReportsRepository to the container
  bind<IAnalyticsReportsRepository>(TYPES.AnalyticsReportsRepository).to(
    AnalyticsReportsRepository
  );

  // constans bindings for the models
  bind<Model<IBlogsCollectionAnalytics>>(
    TYPES.BlogCollectionAnalyticsModel
  ).toConstantValue(BlogsCollectionAnalyticsModel);
  bind<Model<IUsersCollectionAnalytics>>(
    TYPES.UserCollectionAnalyticsModel
  ).toConstantValue(UsersCollectionAnalyticsModel);
  bind<Model<ISupportTicketsCollectionAnalytics>>(
    TYPES.SupportTicketCollectionAnalyticsModel
  ).toConstantValue(SupportTicketsCollectionAnalyticsModel);
  bind<Model<IContentReportingCollectionAnalytics>>(
    TYPES.ContentReportingCollectionAnalyticsModel
  ).toConstantValue(ContentReportingCollectionAnalyticsModel);
  // bind<Model<IUser>>(TYPES.USER_MODEL).toConstantValue(UserModel);
});
