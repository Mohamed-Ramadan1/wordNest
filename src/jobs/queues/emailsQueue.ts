import { Queue } from "bull";

import {
  sendEmailsProcessor,
  emailHandlers,
} from "@jobs/queueProcessors/emailsQueue/sendEmails.processor";
import { createQueue } from "../common/createQueue";

const retryAttempts: number = 5;
const delayTime: number = 5000;

export const emailQueue: Queue = createQueue(
  "emailsQueue",
  retryAttempts,
  delayTime
);

// Register processors for each email type
Object.keys(emailHandlers).forEach((emailType) => {
  emailQueue.process(emailType, sendEmailsProcessor);
});
