import Bull, { Queue, Job } from "bull";
import { UserModel } from "@features/users";
import { banAccountsLogger } from "@logging/index";
import { EmailQueueType } from "@config/emailQueue.config";
import { emailQueue } from "./emailsQueue";
import { IUser } from "@features/users";
import { AppError } from "@utils/appError";
export enum BandAccountQueueTypes {
  UnBanAccount = "unBanAccount",
}

export const bandAccountsQueue: Queue = new Bull("bandAccounts", {
  redis: {
    port: 6379,
    host: "localhost",
  },
  defaultJobOptions: {
    attempts: 5, // Retry failed jobs up to 3 times
    backoff: {
      type: "exponential", // Exponential backoff strategy
      delay: 5000, // Initial delay of 5 seconds
    },
  },
});

// Process the jobs in the queue (automatically un ban accounts after the ban period is passed)
bandAccountsQueue.process(
  BandAccountQueueTypes.UnBanAccount,
  async (job: Job) => {
    const user: IUser | null = await UserModel.findById(job.data.user._id);
    if (!user) {
      throw new AppError("User to be un banned no longer existing ", 404);
    }
    try {
      user.isAccountBanned = false;
      user.accountUnbannedAt = new Date();
      user.accountUnbannedBy = "System";
      user.accountUnbannedComment =
        "Account ban period is passed and automatically ban is disabled.";

      await user.save();

      // add email queue  to notify user by action
      emailQueue.add(EmailQueueType.AccountUnbanned, {
        user,
      });

      // log success un-ban account
      banAccountsLogger.logSuccessUnbanUserAccount(
        "system-automatic-tasks",
        "system-automatic-tasks",
        user.email,
        user._id,
        "system-automatic-tasks",
        user.accountUnbannedComment
      );
    } catch (err: any) {
      // log failed un-ban account
      banAccountsLogger.logFailedUnbanUserAccount(
        "system-automatic-tasks",
        "system-automatic-tasks",
        user.email,
        user._id,
        "system-automatic-tasks",
        "system-automatic-tasks",
        err.message
      );
      throw new AppError(err.message, 500);
    }
  }
);

// Event: Job completed
bandAccountsQueue.on("completed", (job, result) => {
  console.log(
    "---------------------------------------------------------------------"
  );
  console.log(`Job ID: ${job.id} completed`);
  console.log(`Result: ${result}`);
});

// Event: Job failed
bandAccountsQueue.on("failed", (job, err) => {
  console.error(
    "---------------------------------------------------------------------"
  );
  console.error(`Job ID: ${job.id} failed`);
  console.error(`Error: ${err.message}`);
  // Log failed email attempt
});

// Event: Job stalled
bandAccountsQueue.on("stalled", (job) => {
  console.warn(
    "---------------------------------------------------------------------"
  );
  console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
});
