import Bull, { Queue, Job } from "bull";
import fs from "fs";
export enum ResourceCleanupQueueType {
  DeleteLocalFiles = "deleteLocalFiles",
}

// Initialize the queue
export const resourceCleanupQueue: Queue = new Bull("resourceCleanup", {
  redis: {
    port: 6379,
    host: "localhost",
  },
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

// process job
const processResourceCleanupJob = async (job: Job) => {
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Perform resource cleanup logic here
    await fs.promises.unlink(job.data.resourcePath);
    return `Resource cleanup job completed for ${job.data.resource}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);
    throw err;
  }
};

// Register processor for each cleanup type
resourceCleanupQueue.process(
  ResourceCleanupQueueType.DeleteLocalFiles,
  processResourceCleanupJob
);

// Queue event handlers
const setupQueueEvents = (queue: Queue) => {
  queue.on("completed", (job, result) => {
    console.log(
      "---------------------------------------------------------------------"
    );
    console.log(`Job ID: ${job.id} completed`);
    console.log(`Result: ${result}`);
  });

  queue.on("failed", (job, err) => {
    console.error(
      "---------------------------------------------------------------------"
    );
    console.error(`Job ID: ${job.id} failed`);
    console.error(`Error: ${err.message}`);
  });

  queue.on("stalled", (job) => {
    console.warn(
      "---------------------------------------------------------------------"
    );
    console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
  });
};

// Setup queue events
setupQueueEvents(resourceCleanupQueue);
