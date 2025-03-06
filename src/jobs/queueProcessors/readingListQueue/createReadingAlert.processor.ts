import { Job } from "bull";
import { sendReadingReminderEmail } from "@features/readingList/emails";
import { IUser } from "@features/users";
import { IReadingList } from "@features/readingList/interfaces/readingList.interface";
import { IBlog } from "@features/blogs/interfaces/blog.interface";
import { readingListLogger } from "@logging/index";
interface ReadingReminderData {
  user: IUser;
  readingItem: IReadingList;
  blog: IBlog;
}

export const createReadingAlertProcessor = async (
  job: Job<ReadingReminderData>
) => {
  const { user, blog, readingItem } = job.data;
  if (!user || !blog || !readingItem) {
    throw new Error(
      "Invalid job data you have to pass (user, blog, readingItem)"
    );
  }
  try {
    await sendReadingReminderEmail({ user, readingItem, blog });
  } catch (err: any) {
    readingListLogger.logFailedSendReadingReminderEmail(
      user.email,
      readingItem._id,
      err.message,
      job.attemptsMade
    );
    throw new Error(err.message);
  }
};
