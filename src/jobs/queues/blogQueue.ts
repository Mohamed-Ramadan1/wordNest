// packages imports
import { Queue } from "bull";

// constants imports
import { BlogsQueueJobs } from "../constants/blogsQueueJobs";

// common imports
import { createQueue } from "@jobs/common/createQueue";

// processors imports
import { deleteBlogsPostsProcessor } from "../queueProcessors/blogsQueue/deleteBlogsPosts.processor";
import { collectFailedDeletionBlogsProcessor } from "../queueProcessors/blogsQueue/CollectFailedDeletionBlogs.processor";
import { publishScheduledBlogProcessor } from "../queueProcessors/blogsQueue/publishScheduledBlog.processor";
import { sendDeleteBlogEmailProcessor } from "../queueProcessors/blogsQueue/sendDeleteBlogEmail.processor";
import { sendUnPublishedBlogEmailProcessor } from "../queueProcessors/blogsQueue/sendUnPublishedBlogEmail.processor";
import { sendRepublishedBlogEmailProcessor } from "../queueProcessors/blogsQueue/sendRepublishedBlogEmail.processor";

export const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const blogQueue: Queue = createQueue(
  "blogQueue",
  retryAttempts,
  delayTime
);

// Normal job for deleting blogs
blogQueue.process(BlogsQueueJobs.DeleteBlog, deleteBlogsPostsProcessor);

// Corn-job to manually search and delete flagged blogs with deletion status of FAILED
blogQueue.process(
  BlogsQueueJobs.CollectFailedDeletionBlogs,
  collectFailedDeletionBlogsProcessor
);

// publish scheduled blog post
blogQueue.process(
  BlogsQueueJobs.PublishScheduledBlog,
  publishScheduledBlogProcessor
);

// send deletion email
blogQueue.process(
  BlogsQueueJobs.SendDeleteBlogEmail,
  sendDeleteBlogEmailProcessor
);

// send unpublished blog email
blogQueue.process(
  BlogsQueueJobs.SendUnPublishedBlogEmail,
  sendUnPublishedBlogEmailProcessor
);

// send republished blog email
blogQueue.process(
  BlogsQueueJobs.SendRepublishedBlogEmail,
  sendRepublishedBlogEmailProcessor
);

// Clear all repeatable jobs using IIFE (Immediately Invoked Function Expression)

//! This IFE functionality will be moved to its own file later.
(async () => {
  console.log("Clearing all repeatable jobs...");

  // Get all repeatable jobs
  const repeatableJobs = await blogQueue.getRepeatableJobs();

  // Remove each repeatable job
  for (const job of repeatableJobs) {
    console.log(`Removing job: ${job.name}`);
    await blogQueue.removeRepeatableByKey(job.key);
  }

  console.log("All repeatable jobs cleared!");

  // Now, add the job correctly
  console.log("Scheduling blog deletion retry job...");

  await blogQueue.add(
    BlogsQueueJobs.CollectFailedDeletionBlogs,
    {},
    { repeat: { cron: "0 0 * * *" } } // Runs every 3 minutes
  );

  console.log("Job scheduled successfully.");
})();
