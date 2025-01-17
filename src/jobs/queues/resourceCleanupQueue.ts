import { Queue } from "bull";

import { createQueue } from "@jobs/common/createQueue";
import { deleteLocalFilesProcessors } from "@jobs/queueProcessors/resourceCleanupQueue/deleteLocalFiles.processor";
import { ResourceCleanupQueueJobs } from "@jobs/constants/resourceCleanupQueueJobs";

const retryAttempts: number = 5;
const delayTime: number = 1000;

// Initialize the queue
export const resourceCleanupQueue: Queue = createQueue(
  "resourceCleanupQueue",
  retryAttempts,
  delayTime
);

// Register processor for each cleanup type
resourceCleanupQueue.process(
  ResourceCleanupQueueJobs.DeleteLocalFiles,
  deleteLocalFilesProcessors
);
