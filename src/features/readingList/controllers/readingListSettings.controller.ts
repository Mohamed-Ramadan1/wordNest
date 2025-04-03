// Express imports
import { Response, Request } from "express";
// packages imports
import { inject, injectable } from "inversify";

// Shared interface imports
import { ApiResponse, catchAsync, IResponseUtils, TYPES } from "@shared/index";

// interfaces imports
import {
  IReadingListSettingsService,
  ReadingListSettingsRequestParams,
  ReadingListSettingsRequestBody,
} from "../interfaces/index";

@injectable()
export class ReadingListSettingsController {
  constructor(
    @inject(TYPES.ReadingListSettingsService)
    private readonly readingListSettingsService: IReadingListSettingsService,
    @inject(TYPES.ResponseUtils) private readonly responseUtils: IResponseUtils
  ) {}

  /**
   * Sets a reminder alert for a specific reading list item.
   */
  public setReminderAlert = catchAsync(
    async (
      req: Request<{}, {}, ReadingListSettingsRequestBody>,
      res: Response
    ) => {
      await this.readingListSettingsService.setReminderAlert(
        req.body.alertInfo
      );

      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Reminder alert set successfully.you will receive notifications email on the time you set.",
      };

      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Re-schedules an existing reminder alert for a reading list item.
   */
  public reScheduleReminderAlert = catchAsync(
    async (
      req: Request<
        ReadingListSettingsRequestParams,
        {},
        ReadingListSettingsRequestBody
      >,
      res: Response
    ) => {
      await this.readingListSettingsService.reScheduleReminderAlert(
        req.body.alertInfo,
        req.params.itemId.toString()
      );
      const response: ApiResponse<null> = {
        status: "success",
        message: "Reminder alert rescheduled successfully.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Deletes a scheduled reminder alert for a reading list item.
   */
  public deleteReminderAlert = catchAsync(
    async (req: Request<ReadingListSettingsRequestParams>, res: Response) => {
      await this.readingListSettingsService.deleteReminderAlert(
        req.params.itemId,
        req.user._id
      );

      const response: ApiResponse<null> = {
        status: "success",
        message: "Reminder alert deleted successfully.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Enables auto-removal of a reading list item when marked as "read."
   */
  public allowAutoRemoveReadingListItem = catchAsync(
    async (req: Request<ReadingListSettingsRequestParams>, res: Response) => {
      await this.readingListSettingsService.allowAutoRemoveReadingListItem(
        req.params.itemId,
        req.user._id
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Auto-removal enabled successfully. Reading list item will be removed after being marked as reading completed.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );

  /**
   * Disables auto-removal of a reading list item after being marked as "read."
   */
  public disableAutoRemoveReadingListItem = catchAsync(
    async (req: Request<ReadingListSettingsRequestParams>, res: Response) => {
      await this.readingListSettingsService.disableAutoRemoveReadingListItem(
        req.params.itemId,
        req.user._id
      );
      const response: ApiResponse<null> = {
        status: "success",
        message:
          "Auto-removal disabled successfully. Reading list item will not be removed after being marked as reading completed.",
      };
      this.responseUtils.sendResponse(200, res, response);
    }
  );
}
