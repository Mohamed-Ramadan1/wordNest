import { Queue, Job } from "bull";

import { createQueue } from "@jobs/shared/createQueue";

const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const supportTicketQueue: Queue = createQueue(
  "supportTicketQueue",
  retryAttempts,
  delayTime
);
