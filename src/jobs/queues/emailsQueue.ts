import Bull, { Queue, Job } from "bull";
import {
  sendWelcomeEmail,
  sendNewVerificationEmail,
  sendVerificationSuccessEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
} from "@features/auth/emails";
import { logFailedEmailSent } from "@logging/index";
import { EmailQueueType } from "@config/emailQueue.config";

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

// Job: welcomeEmails - Sends a welcome email to the user
emailQueue.process(EmailQueueType.WelcomeEmail, async (job: Job) => {
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

// Job: sendAccountVerifiedEmail - Sends an account verified email to the user
emailQueue.process(
  EmailQueueType.SendAccountVerifiedEmail,
  async (job: Job) => {
    try {
      console.log(`Processing Job ID: ${job.id}`);
      console.log(`Job Data:`, job.data);

      // Extract user from job data
      const { user } = job.data;

      console.log(`Sending account verified email to: ${user.email}`);
      sendVerificationSuccessEmail(user); // Pass the user object to the email-sending function

      return `Account verified email successfully sent to ${user.email}`;
    } catch (err) {
      console.error(`Error processing job ID ${job.id}:`, err);
      throw err; // Ensures the job is marked as failed
    }
  }
);

// Job: resendVerificationEmail - Re-sends the verification email to the user
emailQueue.process(EmailQueueType.ResendVerificationEmail, async (job: Job) => {
  // Logic to resend the verification email to the user
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Extract user from job data
    const { user } = job.data;

    console.log(`Resending verification email to: ${user.email}`);
    sendNewVerificationEmail(user); // Pass the user object to the email-sending function

    return `Verification email successfully resent to ${user.email}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);

    throw err; // Ensures the job is marked as failed
  }
});

// Job reset password request - send reset password request email to the user email
emailQueue.process(EmailQueueType.RequestPasswordReset, (job: Job) => {
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Extract user from job data
    const { user } = job.data;

    console.log(`Sending password reset request email to: ${user.email}`);
    sendForgotPasswordEmail(user);

    return `Password reset request email successfully sent to ${user.email}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);
    throw err; // Ensures the job is marked as failed
  }
});

// Job: resetPassword - send confirmation email to the user let him know that the password has been reset successfully.
emailQueue.process(EmailQueueType.ResetPassword, (job: Job) => {
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Extract user from job data
    const { user } = job.data;

    console.log(`Sending password reset confirmation email to: ${user.email}`);
    sendPasswordChangedEmail(user);

    return `Password reset confirmation email successfully sent to ${user.email}`;
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
  // Log failed email attempt
  logFailedEmailSent(job.name, job.data.user.email, job.attemptsMade);
});

// Event: Job stalled
emailQueue.on("stalled", (job) => {
  console.warn(
    "---------------------------------------------------------------------"
  );
  console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
});
