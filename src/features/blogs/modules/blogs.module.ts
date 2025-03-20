import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/index";
import { Model } from "mongoose";
// model import
import BlogModel from "../models/blog.model";

// services imports
import { BlogManagementService } from "../services/admin/blogsManagement.service";
import { BlogCRUDService } from "../services/owner/blogOwnerCRUD.service";
import { BlogStatusService } from "../services/owner/blogStatus.service";
import { ScheduledBlogsService } from "../services/owner/scheduledBlogs.service";
import { BlogsService } from "../services/user/blogs.service";

// repositories imports
import { BlogAuthorRepository } from "../repositories/blogAuthor.repository";
import { BlogsRepository } from "../repositories/blogs.repository";
import { BlogManagementRepository } from "../repositories/blogsManagement.repository";

// controllers imports
import { BlogManagementController } from "../controllers/admin/blogsManagement.controller";
import { BlogCRUDController } from "../controllers/owner/blogOwnerCRUD.controller";
import { BlogStatusController } from "../controllers/owner/blogStatus.controller";
import { ScheduledBlogsController } from "../controllers/owner/scheduledBlogs.controller";
import { BlogsController } from "../controllers/user/blogs.controller";

// middlewares imports
import { BlogsManagementMiddleware } from "../middlewares/admin/blogsManagement.middleware";
import { BlogOwnerCRUDMiddleware } from "../middlewares/owner/blogOwnerCRUD.middleware";
import { BlogStatusMiddleware } from "../middlewares/owner/blogStatus.middleware";
import { ScheduledBlogsMiddleware } from "../middlewares/owner/scheduledBlogs.middleware";

// interfaces imports
import {
  IBlog,
  IBlogManagementService,
  IBlogOwnerCRUDService,
  IBlogStatusService,
  IBlogsService,
  IScheduledBlogsService,
  IBlogOwnerCRUDMiddleware,
  IBlogStatusMiddleware,
  IBlogsManagementMiddleware,
  IScheduledBlogsMiddleware,
  IBlogRepository,
  IBlogAuthorRepository,
  IBlogManagementRepository,
} from "../interfaces/index";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
  // model binding
  bind<Model<IBlog>>(TYPES.BlogModel).toConstantValue(BlogModel);

  // Binding the services
  bind<IBlogManagementService>(TYPES.BlogManagementService)
    .to(BlogManagementService)
    .inSingletonScope();
  bind<IBlogOwnerCRUDService>(TYPES.BlogOwnerCRUDService)
    .to(BlogCRUDService)
    .inSingletonScope();
  bind<IBlogStatusService>(TYPES.BlogStatusService)
    .to(BlogStatusService)
    .inSingletonScope();
  bind<IScheduledBlogsService>(TYPES.ScheduledBlogsService)
    .to(ScheduledBlogsService)
    .inSingletonScope();
  bind<IBlogsService>(TYPES.BlogsService).to(BlogsService).inSingletonScope();

  // Binding the controllers
  bind<BlogManagementController>(TYPES.BlogManagementController)
    .to(BlogManagementController)
    .inSingletonScope();
  bind<BlogCRUDController>(TYPES.BlogOwnerCRUDController)
    .to(BlogCRUDController)
    .inSingletonScope();
  bind<BlogStatusController>(TYPES.BlogStatusController)
    .to(BlogStatusController)
    .inSingletonScope();
  bind<ScheduledBlogsController>(TYPES.ScheduledBlogsController)
    .to(ScheduledBlogsController)
    .inSingletonScope();
  bind<BlogsController>(TYPES.BlogsController)
    .to(BlogsController)
    .inSingletonScope();

  // Binding the middlewares
  bind<IBlogsManagementMiddleware>(TYPES.BlogsManagementMiddleware)
    .to(BlogsManagementMiddleware)
    .inSingletonScope();

  bind<IBlogOwnerCRUDMiddleware>(TYPES.BlogOwnerCRUDMiddleware)
    .to(BlogOwnerCRUDMiddleware)
    .inSingletonScope();

  bind<IBlogStatusMiddleware>(TYPES.BlogStatusMiddleware)
    .to(BlogStatusMiddleware)
    .inSingletonScope();

  bind<IScheduledBlogsMiddleware>(TYPES.ScheduledBlogsMiddleware)
    .to(ScheduledBlogsMiddleware)
    .inSingletonScope();

  // Binding the repositories
  bind<IBlogRepository>(TYPES.BlogsRepository)
    .to(BlogsRepository)
    .inSingletonScope();

  bind<IBlogManagementRepository>(TYPES.BlogManagementRepository)
    .to(BlogManagementRepository)
    .inSingletonScope();

  bind<IBlogAuthorRepository>(TYPES.BlogAuthorRepository)
    .to(BlogAuthorRepository)
    .inSingletonScope();
});
