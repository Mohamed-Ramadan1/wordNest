
import { Job } from "bull";
import { UserModel } from "@features/users";
import { BandedAccountsLogger } from "@logging/index";
import { EmailQueueJobs } from "@jobs/constants/emailQueueJobs";
import { emailQueue } from "../../queues/emailsQueue";
import { IUser } from "@features/users";
import { AppError } from "@shared/index";
import {container} from '@config/inversify.config'

const bandAccountsLogger = new BandedAccountsLogger();

export const unBanAccountProcessor = async (job: Job) => {
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
    emailQueue.add(EmailQueueJobs.AccountUnbanned, {
      user,
    });

    // log success un-ban account
    bandAccountsLogger.logSuccessUnbanUserAccount(
      "system-automatic-tasks",
      "system-automatic-tasks",
      user.email,
      user._id,
      "system-automatic-tasks",
      user.accountUnbannedComment
    );
  } catch (err: any) {
    // log failed un-ban account
    bandAccountsLogger.logFailedUnbanUserAccount(
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
};
