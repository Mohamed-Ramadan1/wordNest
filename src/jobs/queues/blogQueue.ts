import { Queue } from "bull";
import { BlogsQueueJobs } from "../constants/blogsQueueJobs";
import { createQueue } from "@jobs/common/createQueue";
import { deleteBlogsPostsProcessor } from "../queueProcessors/blogsQueue/deleteBlogsPosts.processor";

const retryAttempts: number = 5;
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
