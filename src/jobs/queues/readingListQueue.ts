import { Queue } from "bull";

import { createQueue } from "../common/createQueue";
// jobs import
import { ReadingListQueueJobs } from "../constants/readingListQueueJobs";

// processor imports
import { createReadingAlertProcessor } from "../queueProcessors/readingListQueue/createReadingAlert.processor";

const retryAttempts: number = 5;
const delayTime: number = 5000;

export const readingListQueue: Queue = createQueue(
  "readingsListQueue",
  retryAttempts,
  delayTime
);

// create reading alert processor
readingListQueue.process(
  ReadingListQueueJobs.CreateReadingAlert,
  createReadingAlertProcessor
);
