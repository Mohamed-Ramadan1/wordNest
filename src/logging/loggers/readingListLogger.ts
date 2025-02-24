import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";

// Configure Winston logger
const readingListLogger: Logger = createLogger("readingList");

// log fail send reminder reading alert email
export const logFailedSendReadingReminderEmail = (
  email: string | undefined,

  readingItemId: ObjectId | undefined,
  errorMessage: string | undefined,
  madeAttempt: number
) => {
  readingListLogger.error({
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
