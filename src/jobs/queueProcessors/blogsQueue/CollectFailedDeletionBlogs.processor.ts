import {
  IBlog,
  DeletionStatus,
} from "@features/blogs/interfaces/blog.interface";
import BlogModel from "@features/blogs/models/blog.model";
import { AppError } from "@utils/appError";

import { blogQueueLogger } from "@logging/index";
import { BlogsQueueJobs, blogQueue } from "@jobs/index";

export const collectFailedDeletionBlogsProcessor = async () => {
  try {
    const failedDeletionBlogs: IBlog[] = await BlogModel.find({
      deletionStatus: DeletionStatus.FAILED,
    });

    if (failedDeletionBlogs.length === 0) {
      return;
    }
    for (const blog of failedDeletionBlogs) {
      await blogQueue.add(BlogsQueueJobs.DeleteBlog, { blog });
    }
  } catch (err: any) {
    blogQueueLogger.logFailedCollectFailedDeletionBlogs(err.message);
    throw new AppError(err.message, 500);
  }
};
