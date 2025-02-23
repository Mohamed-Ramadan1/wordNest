import { readingListQueue } from "@jobs/index";
import { Job } from "bull";

export const checkReadingListJobExist = async (
  jobId: string
): Promise<Job | null> => {
  const job = await readingListQueue.getJob(jobId);

  return job;
};
