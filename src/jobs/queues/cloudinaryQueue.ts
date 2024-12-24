import Bull, { Queue, Job } from "bull";

// cloudinary imports
import cloudinary from "cloudinary";

// import related configurations related to the
import { CloudinaryQueueType } from "@config/cloudinaryQueue.config";

// logs imports
import { logFailedImageDelete } from "@logging/index";

export const cloudinaryQueue: Queue = new Bull("cloudinary", {
  redis: {
    port: 6379,
    host: "localhost",
  },
  defaultJobOptions: {
    attempts: 5, // Retry failed jobs up to 3 times
    backoff: {
      type: "exponential", // Exponential backoff strategy
      delay: 5000, // Initial delay of 5 seconds
    },
  },
});

cloudinaryQueue.process(CloudinaryQueueType.DeleteImage, async (job: Job) => {
  try {
    const destroyResponse = await cloudinary.v2.uploader.destroy(
      job.data.profilePictureId
    );

    if (destroyResponse.result !== "ok") {
      logFailedImageDelete(
        "image deleting fail ",
        job.data.profilePictureId,
        job.data.userId
      );
    }
  } catch (err: any) {
    logFailedImageDelete(
      err.message,
      job.data.profilePictureId,
      job.data.userId
    );
  }
});

// Event: Job completed
cloudinaryQueue.on("completed", (job, result) => {
  console.log(
    "---------------------------------------------------------------------"
  );
  console.log(`Job ID: ${job.id} completed`);
  console.log(`Result: ${result}`);
});

// Event: Job failed
cloudinaryQueue.on("failed", (job, err) => {
  console.error(
    "---------------------------------------------------------------------"
  );
  console.error(`Job ID: ${job.id} failed`);
  console.error(`Error: ${err.message}`);
  // Log failed email attempt
});

// Event: Job stalled
cloudinaryQueue.on("stalled", (job) => {
  console.warn(
    "---------------------------------------------------------------------"
  );
  console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
});
