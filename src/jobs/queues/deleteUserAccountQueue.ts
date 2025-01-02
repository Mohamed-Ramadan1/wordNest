import { UserModel } from "@features/users";
import Bull, { Queue, Job } from "bull";

// queue instance
export enum DeleteUserAccountQueueType {
  DeleteUserAccount = "deleteUserAccount",
}

// Initialize the queue
export const deleteUserAccountQueue: Queue = new Bull(
  "deleteUserAccountQueue",
  {
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
  }
);

// Generic email processor function
const processDeleteUserAccountJob = async (job: Job) => {
  const user = job.data.user;
  try {
    await UserModel.deleteOne({ _id: user._id });
    return "User account deleted successfully";
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Register processor for delete user account job
deleteUserAccountQueue.process(
  DeleteUserAccountQueueType.DeleteUserAccount,
  processDeleteUserAccountJob
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
setupQueueEvents(deleteUserAccountQueue);
