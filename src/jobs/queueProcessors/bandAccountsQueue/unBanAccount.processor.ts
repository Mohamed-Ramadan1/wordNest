import { Job } from "bull";
import { UserModel } from "@features/users";
import { banAccountsLogger } from "@logging/index";
import { EmailQueueType } from "@jobs/constants/emailQueueJobs";
import { emailQueue } from "../../queues/emailsQueue";
import { IUser } from "@features/users";
import { AppError } from "@utils/appError";

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
};
