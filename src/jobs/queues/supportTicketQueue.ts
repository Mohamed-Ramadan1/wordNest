// supportTicketQueue.ts
import { Queue } from "bull";
import { createQueue } from "@jobs/shared/createQueue";

import { ticketsEmailSenderProcessor } from "../queueProcessors/supportTicketsQueue/ticketsEmailSender.processor";
import { SupportTicketQueueJobs } from "../queueProcessors/supportTicketsQueue/ticketsEmailSender.processor";
const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const supportTicketQueue: Queue = createQueue(
  "supportTicketQueue",
  retryAttempts,
  delayTime
);

// Register processors for all job types
Object.values(SupportTicketQueueJobs).forEach((jobType) => {
  supportTicketQueue.process(jobType, ticketsEmailSenderProcessor);
});
