//packages imports
import { isValid, parse } from "date-fns";

import { inject, injectable } from "inversify";

//express imports
import { Response, Request, NextFunction } from "express";

// models imports
import { ReadingListModel } from "../models/readingList.model";

// shard imports
import { AppError, catchAsync, validateDto } from "@shared/index";

// interfaces imports
import {
  validateAlertTimeDateFormatRequestBody,
  ReadingListSettingsRequestBody,
  ReadingListSettingsRequestParams,
  ReminderAlertData,
  DeleteReminderAlert,
  IReadingList,
  IReadingListSettingsMiddleware,
} from "../interfaces/index";

// dto imports
import { validateAlertTimeFormateDateDto } from "../dtos/validateAlertDateFormate.dto";

// helpers
import { checkReadingListJobExist } from "../helpers/validateJobExist.helper";

import { IBlog } from "@features/blogs/interfaces/index";

@injectable()
export class ReadingListSettingsMiddleware
  implements IReadingListSettingsMiddleware
{
  constructor() {}
  public validateAlertTimeFormateDate = [
    validateDto(validateAlertTimeFormateDateDto),
    catchAsync(
      async (
        req: Request<{}, {}, validateAlertTimeDateFormatRequestBody>,
        res: Response,
        next: NextFunction
      ) => {
        const { alertTime } = req.body;

        // Convert '21/10/2025 14:30' (DD/MM/YYYY HH:mm) to a valid Date object
        const parsedDate = parse(alertTime, "dd/MM/yyyy HH:mm", new Date());

        if (!isValid(parsedDate)) {
          return next(
            new AppError("Invalid date format. Use DD/MM/YYYY HH:mm.", 400)
          );
        }

        // Ensure the scheduled date is in the future
        const now = new Date();
        if (parsedDate < now) {
          return next(
            new AppError("alert time date should be in the future.", 400)
          );
        }

        // Normalize the date to remove seconds & milliseconds
        parsedDate.setSeconds(0, 0);
        req.body.parsedDate = parsedDate;

        next();
      }
    ),
  ];

  public createReadingReminderAlert = catchAsync(
    async (
      req: Request<
        ReadingListSettingsRequestParams,
        {},
        ReadingListSettingsRequestBody & validateAlertTimeDateFormatRequestBody
      >,
      res: Response,
      next: NextFunction
    ) => {
      const { parsedDate } = req.body;
      const { itemId } = req.params;

      // check item existing and extract required data
      const readingItem: IReadingList | null = await ReadingListModel.findOne({
        _id: itemId,
        user: req.user._id,
      });
      if (!readingItem) {
        return next(
          new AppError("Reading item you want to set alert for  not found", 404)
        );
      }
      const alertData: ReminderAlertData = {
        alertTime: parsedDate,
        blog: readingItem.blogPost as IBlog,
        readingItem,
        user: req.user,
      };

      req.body.alertInfo = alertData;
      next();
    }
  );

  public validateReScheduleReminderAlert = catchAsync(
    async (
      req: Request<ReadingListSettingsRequestParams>,
      res: Response,
      next: NextFunction
    ) => {
      const { itemId } = req.params;

      const job = await checkReadingListJobExist(itemId.toString());
      if (!job) {
        return next(
          new AppError(
            "no alert found for this reading item, you can not reschedule alert for the item that not have a scheduled alert",
            400
          )
        );
      }

      next();
    }
  );

  public validateCreateReminderAlert = catchAsync(
    async (
      req: Request<ReadingListSettingsRequestParams, {}, DeleteReminderAlert>,
      res: Response,
      next: NextFunction
    ) => {
      const { itemId } = req.params;

      const job = await checkReadingListJobExist(itemId.toString());
      if (job) {
        return next(
          new AppError(
            "You already set an alert for this reading item, you can not set another alert for the same item",
            400
          )
        );
      }
      next();
    }
  );

  public validateDeleteReminderAlert = catchAsync(
    async (
      req: Request<ReadingListSettingsRequestParams, {}, DeleteReminderAlert>,
      res: Response,
      next: NextFunction
    ) => {
      const { itemId } = req.params;

      const job = await checkReadingListJobExist(itemId.toString());
      if (!job) {
        return next(
          new AppError(
            "no alert found for this reading item, you can not delete alert for the item that not have a scheduled alert",
            400
          )
        );
      }

      next();
    }
  );
}
