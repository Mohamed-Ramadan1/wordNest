import { Queue } from "bull";
import { BlogsQueueJobs } from "../constants/blogsQueueJobs";
import { createQueue } from "@jobs/common/createQueue";
import { deleteBlogsPostsProcessor } from "../queueProcessors/blogsQueue/deleteBlogsPosts.processor";
import { collectFailedDeletionBlogsProcessor } from "../queueProcessors/blogsQueue/CollectFailedDeletionBlogs.processor";
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
    { repeat: { cron: "*/3 * * * *" } } // Runs every 3 minutes
  );

  console.log("Job scheduled successfully.");
})();
