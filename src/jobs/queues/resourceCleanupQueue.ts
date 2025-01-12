import { Queue } from "bull";

import { createQueue } from "@jobs/shared/createQueue";
import { deleteLocalFilesProcessors } from "@jobs/queueProcessors/resourceCleanupQueue/deleteLocalFiles.processor";

export enum ResourceCleanupQueueType {
  DeleteLocalFiles = "deleteLocalFiles",
}

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
  ResourceCleanupQueueType.DeleteLocalFiles,
  deleteLocalFilesProcessors
);
