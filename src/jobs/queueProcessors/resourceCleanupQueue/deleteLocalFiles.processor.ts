import fs from "fs";
import { Job } from "bull";

// process job
export const deleteLocalFilesProcessors = async (job: Job) => {
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Perform resource cleanup logic here
    await fs.promises.unlink(job.data.resourcePath);
    return `Resource cleanup job completed for ${job.data.resource}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);
  }
};
