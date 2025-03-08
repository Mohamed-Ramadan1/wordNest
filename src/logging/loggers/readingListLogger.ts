import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IReadingListLogger } from "@logging/interfaces";

export class ReadingListLogger implements IReadingListLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("readingList");
  }

  // log fail send reminder reading alert email
  logFailedSendReadingReminderEmail = (
    email: string | undefined,

    readingItemId: ObjectId | undefined,
    errorMessage: string | undefined,
    madeAttempt: number
  ) => {
    this.logger.error({
      message: `Failed to send reading reminder email to user with email: ${email}`,
      email,
      readingItemId,
      errorMessage,
      madeAttempt,
      level: "error",
      timestamp: new Date().toISOString(),
      location: "readingListQueue",
    });
  };
}
