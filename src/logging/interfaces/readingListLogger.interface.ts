import { ObjectId } from "mongoose";

/**
 * Interface for logging events related to reading list notifications and reminders.
 */
export interface IReadingListLogger {
  /**
   * Log a failed attempt to send a reading reminder email.
   * @param email - The email address of the user who failed to receive the reminder.
   * @param readingItemId - The ID of the reading item that the reminder is related to.
   * @param errorMessage - The error message explaining why the reminder failed to send.
   * @param madeAttempt - The number of attempts made to send the reminder.
   */
  logFailedSendReadingReminderEmail(
    email: string | undefined,
    readingItemId: ObjectId | undefined,
    errorMessage: string | undefined,
    madeAttempt: number
  ): void;
}
