import { Queue, Job } from "bull";

import { createQueue } from "@jobs/shared/createQueue";

// processor imports
import { sendSupportTicketCreationEmailProcessor } from "../queueProcessors/supportTicketsQueue/supportTicketCreation.processor";

export enum SupportTicketQueueJobs {
  sendTicketCreationEmail = "sendSupportTicketCreationEmail",
}

const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const supportTicketQueue: Queue = createQueue(
  "supportTicketQueue",
  retryAttempts,
  delayTime
);

// Add processors to the queue
supportTicketQueue.process(
  SupportTicketQueueJobs.sendTicketCreationEmail,
  sendSupportTicketCreationEmailProcessor
);
