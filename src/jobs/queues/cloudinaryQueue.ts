import { Queue } from "bull";

// import related configurations related to the
import { CloudinaryQueueJobs } from "@jobs/constants/cloudinaryQueueJobs";

// logs imports
import { createQueue } from "@jobs/common/createQueue";

import { deleteImageProcessor } from "@jobs/queueProcessors/cloudinaryQueue/deleteImage.processor";

const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const cloudinaryQueue: Queue = createQueue(
  "cloudinaryQueue",
  retryAttempts,
  delayTime
);

// Process the jobs in the queue (automatically delete images from cloudinary)
cloudinaryQueue.process(CloudinaryQueueJobs.DeleteImage, deleteImageProcessor);
