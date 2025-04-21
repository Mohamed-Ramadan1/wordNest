import { Queue } from "bull";

// constants imports
import { ContentReportingQueueJobs } from "../constants/contentReportingQueueJobs";

// processor imports
import { SendReceiveReportConfirmationProcessor } from "../queueProcessors/contentReporting/sendReceiveReportConfirmation.processor";
import { createQueue } from "@jobs/common/createQueue";

const sendReceiveReportConfirmationProcessor =
  new SendReceiveReportConfirmationProcessor();

const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const contentReportingQueue: Queue = createQueue(
  "contentReportingQueue",
  retryAttempts,
  delayTime
);

// Register the processor
contentReportingQueue.process(
  ContentReportingQueueJobs.SendReceiveReportConfirmation,
  sendReceiveReportConfirmationProcessor.process
);
