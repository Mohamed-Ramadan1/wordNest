import Bull, { Queue, Job } from "bull";
import { sendWelcomeEmail } from "@features/auth/emails/sendWelcomeEmail";

// Initialize the queue
export const emailQueue: Queue = new Bull("emails", {
  redis: {
    port: 6379,
    host: "localhost",
  },
  defaultJobOptions: {
    attempts: 3, // Retry failed jobs up to 3 times
    backoff: {
      type: "exponential", // Exponential backoff strategy
      delay: 5000, // Initial delay of 5 seconds
    },
  },
});

// Process the jobs in the queue
emailQueue.process("welcomeEmail", async (job: Job) => {
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Extract user from job data
    const { user } = job.data;

    console.log(`Sending welcome email to: ${user.email}`);
    sendWelcomeEmail(user); // Pass the user object to the email-sending function

    return `Welcome email successfully sent to ${user.email}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);
    throw err; // Ensures the job is marked as failed
  }
});

// Event: Job completed
emailQueue.on("completed", (job, result) => {
  console.log(
    "---------------------------------------------------------------------"
  );
  console.log(`Job ID: ${job.id} completed`);
  console.log(`Result: ${result}`);
});

// Event: Job failed
emailQueue.on("failed", (job, err) => {
  console.error(
    "---------------------------------------------------------------------"
  );
  console.error(`Job ID: ${job.id} failed`);
  console.error(`Error: ${err.message}`);
});

// Event: Job stalled
emailQueue.on("stalled", (job) => {
  console.warn(
    "---------------------------------------------------------------------"
  );
  console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
});
