import { Job } from "bull";
import { sendBlogReviewEmail } from "@features/blogs/emails";
import { blogQueueLogger } from "@logging/index";

export const sendUnPublishedBlogEmailProcessor = async (
  job: Job
): Promise<void> => {
  const { blogPost, blogAuthor } = job.data;

  try {
    if (!blogPost || !blogAuthor) {
      throw new Error("The blog data is not passed correctly.");
    }
    await sendBlogReviewEmail(blogAuthor, blogPost);
  } catch (err: any) {
    blogQueueLogger.logFailedSendUnPublishedBlogEmail(
      err.message ||
        "Failed to send blog  un-publish blog post confirmation email.",
      job.attemptsMade,
      blogPost._id,
      blogAuthor.email || "unknown email"
    );
    throw new Error(
      err.message || "Failed to send un-publish blog post confirmation email."
    );
  }
};
