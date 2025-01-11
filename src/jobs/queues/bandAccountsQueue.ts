import { Queue } from "bull";
import { unBanAccountProcessor } from "@jobs/queueProcessors/bandAccountsQueue/unBanAccount.processor";

import { createQueue } from "@jobs/shared/createQueue";
export enum BandAccountQueueTypes {
  UnBanAccount = "unBanAccount",
}

const retryAttempts: number = 5;
const delayTime: number = 5000;
// Initialize the queue
export const bandAccountsQueue: Queue = createQueue(
  "bandAccountsQueue",
  retryAttempts,
  delayTime
);

// Process the jobs in the queue (automatically un ban accounts after the ban period is passed)
bandAccountsQueue.process(
  BandAccountQueueTypes.UnBanAccount,
  unBanAccountProcessor
);
