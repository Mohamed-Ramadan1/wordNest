export const BLOGS_TYPES = {
  BlogModel: Symbol.for("BlogModel"),
  BlogsService: Symbol.for("BlogsService"),
  BlogsController: Symbol.for("BlogsController"),

  BlogOwnerCRUDService: Symbol.for("BlogCRUDService"),
  BlogOwnerCRUDController: Symbol.for("BlogCRUDController"),

  BlogStatusService: Symbol.for("BlogStatusService"),
  BlogStatusController: Symbol.for("BlogStatusController"),

  ScheduledBlogsService: Symbol.for("ScheduledBlogsService"),
  ScheduledBlogsController: Symbol.for("ScheduledBlogsController"),

  BlogManagementService: Symbol.for("BlogManagementService"),
  BlogManagementController: Symbol.for("BlogManagementController"),

  BlogOwnerCRUDMiddleware: Symbol.for("BlogOwnerCRUDMiddleware"),
  BlogStatusMiddleware: Symbol.for("BlogStatusMiddleware"),
  ScheduledBlogsMiddleware: Symbol.for("ScheduledBlogsMiddleware"),
  BlogsManagementMiddleware: Symbol.for("BlogsManagementMiddleware"),

  BlogsRepository: Symbol.for("BlogsRepository"),
  BlogManagementRepository: Symbol.for("BlogManagementRepository"),
  BlogAuthorRepository: Symbol.for("BlogAuthorRepository"),
};
