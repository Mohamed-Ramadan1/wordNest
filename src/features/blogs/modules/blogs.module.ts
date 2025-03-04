import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "@shared/types/containerTypes";

// services imports
import { BlogManagementService } from "../services/admin/blogsManagement.service";
import { BlogCRUDService } from "../services/owner/blogOwnerCRUD.service";
import { BlogStatusService } from "../services/owner/blogStatus.service";
import { ScheduledBlogsService } from "../services/owner/scheduledBlogs.service";
import { BlogsService } from "../services/user/blogs.service";

// controllers imports
import { BlogManagementController } from "../controllers/admin/blogsManagement.controller";
import { BlogCRUDController } from "../controllers/owner/blogOwnerCRUD.controller";
import { BlogStatusController } from "../controllers/owner/blogStatus.controller";
import { ScheduledBlogsController } from "../controllers/owner/scheduledBlogs.controller";
import { BlogsController } from "../controllers/user/blogs.controller";

// interfaces imports
import {
  IBlogManagementService,
  IBlogOwnerCRUDService,
  IBlogStatusService,
  IBlogsService,
  IScheduledBlogsService,
} from "../interfaces/index";

/**
 * This module encapsulates the bindings for the Authentication feature.
 * It defines how the services and controllers are bound to the container.
 */
export default new ContainerModule((bind: interfaces.Bind) => {
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
});
