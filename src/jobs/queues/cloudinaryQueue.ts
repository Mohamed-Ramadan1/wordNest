import { Queue } from "bull";

// import related configurations related to the
import { CloudinaryQueueType } from "@config/cloudinaryQueue.config";

// logs imports
import { createQueue } from "@jobs/shared/createQueue";

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
cloudinaryQueue.process(CloudinaryQueueType.DeleteImage, deleteImageProcessor);
  