import { Job } from "bull";
import { sendBlogRepublishEmail } from "@features/blogs/emails";
import { BlogsQueueLogger } from "@logging/index";

const blogQueueLogger = new BlogsQueueLogger();
export const sendRepublishedBlogEmailProcessor = async (
  job: Job
): Promise<void> => {
  const { blogPost, blogAuthor } = job.data;

  try {
    if (!blogPost || !blogAuthor) {
      throw new Error("The blog data is not passed correctly.");
    }
    await sendBlogRepublishEmail(blogAuthor, blogPost);
  } catch (err: any) {
    blogQueueLogger.logFailedSendRepublishedBlogEmail(
      err.message ||
        "Failed to send blog  re-publish blog post confirmation email.",
      job.attemptsMade,
      blogPost._id,
      blogAuthor.email || "unknown email"
    );
    throw new Error(
      err.message || "Failed to send re-publish blog post confirmation email."
    );
  }
};
