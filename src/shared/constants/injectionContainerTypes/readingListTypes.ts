export const READING_LIST_TYPES = {
  ReadingListCRUDController: Symbol.for("ReadingListCRUDController"),
  ReadingListCRUDService: Symbol.for("ReadingListCRUDService"),

  ReadingListManagementController: Symbol.for(
    "ReadingListManagementController"
  ),
  ReadingListManagementService: Symbol.for("ReadingListManagementService"),

  ReadingListSettingsController: Symbol.for("ReadingListSettingsController"),
  ReadingListSettingsService: Symbol.for("ReadingListSettingsService"),
  ReadingListCRUDMiddleware: Symbol.for("ReadingListCRUDMiddleware"),
  ReadingListSettingsMiddleware: Symbol.for("ReadingListSettingsMiddleware"),
  ReadingListModel: Symbol.for("ReadingListModel"),
  ReadingListRepository: Symbol.for("ReadingListRepository"),
};
