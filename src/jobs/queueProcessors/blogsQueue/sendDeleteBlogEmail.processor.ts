import { Job } from "bull";
import { sendBlogDeletionEmail } from "@features/blogs/emails";
import { blogQueueLogger } from "@logging/index";

export const sendDeleteBlogEmailProcessor = async (job: Job): Promise<void> => {
  const { blogPost, blogAuthor } = job.data;

  try {
    if (!blogPost || !blogAuthor) {
      throw new Error("The blog data is not passed correctly.");
    }
    await sendBlogDeletionEmail(blogAuthor, blogPost);
  } catch (err: any) {
    blogQueueLogger.logFailedSendDeleteBlogEmail(
      err.message || "Failed to send blog deletion email",
      job.attemptsMade,
      blogPost._id,
      blogAuthor.email || "unknown email"
    );
    throw new Error(err.message || "Failed to send blog deletion email");
  }
};
