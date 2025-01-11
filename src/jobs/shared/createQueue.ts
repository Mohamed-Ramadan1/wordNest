import Bull, { Queue } from "bull";

// Singleton pattern to avoid duplicate queues
const queues: Record<string, Queue> = {};

export const createQueue = (
  queueName: string,
  retryAttempts: number,
  delayTime: number,
  redisConfig: { port: number; host: string } = {
    port: 6379,
    host: "localhost",
  },
  additionalOptions: Partial<Bull.QueueOptions> = {}
): Queue => {
  // Return existing queue if it already exists
  if (queues[queueName]) {
    return queues[queueName];
  }

  try {
    // Create a new queue with the provided configuration
    const newQueue: Queue = new Bull(queueName, {
      redis: redisConfig,
      defaultJobOptions: {
        attempts: retryAttempts,
        backoff: {
          type: "exponential",
          delay: delayTime,
        },
        removeOnComplete: true, // Clean up completed jobs
        removeOnFail: true, // Clean up failed jobs
      },
      settings: {
        stalledInterval: 60000, // Check for stalled jobs every 60 seconds
        maxStalledCount: 5, // Max number of times a job can be stalled before failing
        retryProcessDelay: 500, // Delay before retrying a failed job
      },
      limiter: {
        max: 100, // Max number of jobs processed in 5 seconds
        duration: 5000,
      },
      ...additionalOptions, // Merge any additional options provided
    });

    // Log queue creation
    console.log(`Queue "${queueName}" created successfully.`);

    // Setup event listeners for monitoring
    newQueue.on("completed", (job, result) => {
      console.log(
        "---------------------------------------------------------------------"
      );
      console.log(`Job ID: ${job.id} completed`);
      console.log(`Result: ${result}`);
    });

    newQueue.on("failed", (job, err) => {
      console.error(
        "---------------------------------------------------------------------"
      );
      console.error(`Job ID: ${job.id} failed`);
      console.error(`Error: ${err.message}`);
    });

    newQueue.on("stalled", (job) => {
      console.warn(
        "---------------------------------------------------------------------"
      );
      console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
    });

    newQueue.on("waiting", (jobId) => {
      console.log(`Job ID: ${jobId} is waiting.`);
    });

    newQueue.on("active", (job) => {
      console.log(`Job ID: ${job.id} is now active.`);
    });

    // Store the queue in the singleton map
    queues[queueName] = newQueue;

    return newQueue;
  } catch (error) {
    console.error(`Failed to create queue "${queueName}":`, error);
    throw error; // Re-throw the error to handle it upstream
  }
};
