export const BLOGS_TYPES = {
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
};
