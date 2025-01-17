import { deleteUserAccountProcessor } from "@jobs/queueProcessors/deleteUsersQueue/deleteUser.processor";
import { createQueue } from "@jobs/common/createQueue";

import { Queue } from "bull";
import { DeleteUserAccountQueueJobs } from "@jobs/constants/deleteUserAccountQueueJobs";

const retryAttempts: number = 5;
const delayTime: number = 5000;

// Initialize the queue
export const deleteUserAccountQueue: Queue = createQueue(
  "deleteUserAccountQueue",
  retryAttempts,
  delayTime
);

// Register processor for delete user account job
deleteUserAccountQueue.process(
  DeleteUserAccountQueueJobs.DeleteUserAccount,
  deleteUserAccountProcessor
);
