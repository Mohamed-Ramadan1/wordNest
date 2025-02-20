import { Job } from "bull";
import { ScheduleStatus } from "@features/blogs/interfaces/blog.interface";
import BlogModel from "@features/blogs/models/blog.model";
import { AppError } from "@utils/appError";
import { ObjectId } from "mongoose";
import { blogQueueLogger } from "@logging/index";

export interface PublishScheduledBlog {
  blogId: ObjectId;
}
export const publishScheduledBlogProcessor = async (
  job: Job<PublishScheduledBlog>
): Promise<void> => {
  const { blogId } = job.data;
  if (!blogId) {
    throw new Error("The blog data is not passed correctly.");
  }
  try {
    await BlogModel.findByIdAndUpdate(
      blogId,
      {
        isPublished: true,
        publishedAt: new Date(),
        scheduleStatus: ScheduleStatus.PUBLISHED,
        isScheduled: false,
        scheduledFor: undefined,
      },
      { new: true }
    );
  } catch (err: any) {
    blogQueueLogger.logFailedPublishScheduledBlog(
      err.message,
      job.attemptsMade,
      blogId
    );
    throw new AppError(err.message, 500);
  }
};
