import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IUser } from "@features/users";

// Configure Winston logger
const blogsQueueLogger: Logger = createLogger("blogsQueue");

// log failed blog post deletion events
export const logFailedBlogDeletion = (
  errorMessage: string,
  jobAttempt: number,
  blogId: ObjectId | undefined = undefined
) => {
  blogsQueueLogger.error({
    message: "Failed to delete a blog post",
    blogId: blogId ? blogId : "unknown blog id",
    errorMessage,
    jobAttempt,
    timestamp: new Date().toISOString(),
    errorLocation: "BlogQueueProcessor",
  });
};

// log failed corn job for collect all failed jobs and read them to the delete queue again
export const logFailedCollectFailedDeletionBlogs = (errorMessage: string) => {
  blogsQueueLogger.error({
    message:
      "Failed to collectFailedDeletionBlogsProcessor and register them again to the delete queue",
    errorMessage,

    timestamp: new Date().toISOString(),
    errorLocation: "collectFailedDeletionBlogsProcessor",
  });
};
