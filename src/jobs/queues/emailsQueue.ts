import Bull, { Queue, Job } from "bull";
import {
  sendWelcomeEmail,
  sendNewVerificationEmail,
  sendVerificationSuccessEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
} from "@features/auth/emails";

//emails from users feature
import {
  sendDeactivationConfirmationEmail,
  sendDeactivationAccountSuccess,
  sendReactivationConfirmationEmail,
  sendReactivationSuccessEmail,
} from "@features/users/emails";

import { logFailedEmailSent } from "@logging/index";
import { EmailQueueType } from "@config/emailQueue.config";

// Map email types to their corresponding sending functions
const emailHandlers = {
  [EmailQueueType.WelcomeEmail]: sendWelcomeEmail,
  [EmailQueueType.SendAccountVerifiedEmail]: sendVerificationSuccessEmail,
  [EmailQueueType.ResendVerificationEmail]: sendNewVerificationEmail,
  [EmailQueueType.RequestPasswordReset]: sendForgotPasswordEmail,
  [EmailQueueType.ResetPassword]: sendPasswordChangedEmail,
  [EmailQueueType.DeactivateAccountRequest]: sendDeactivationConfirmationEmail,
  [EmailQueueType.DeactivateAccountConfirmation]:
    sendDeactivationAccountSuccess,
  [EmailQueueType.ReactivateAccountConfirm]: sendReactivationConfirmationEmail,
  [EmailQueueType.ReactivateAccountSuccess]: sendReactivationSuccessEmail,
};

// Initialize the queue
export const emailQueue: Queue = new Bull("emails", {
  redis: {
    port: 6379,
    host: "localhost",
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

// Generic email processor function
const processEmailJob = async (job: Job) => {
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    const { user } = job.data;
    const emailHandler = emailHandlers[job.name as EmailQueueType];

    if (!emailHandler) {
      throw new Error(`No handler found for email type: ${job.name}`);
    }

    console.log(`Sending ${job.name} email to: ${user.email}`);
    await emailHandler(user);

    return `${job.name} email successfully sent to ${user.email}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);
    throw err;
  }
};

// Register processors for each email type
Object.keys(emailHandlers).forEach((emailType) => {
  emailQueue.process(emailType, processEmailJob);
});

// Queue event handlers
const setupQueueEvents = (queue: Queue) => {
  queue.on("completed", (job, result) => {
    console.log(
      "---------------------------------------------------------------------"
    );
    console.log(`Job ID: ${job.id} completed`);
    console.log(`Result: ${result}`);
  });

  queue.on("failed", (job, err) => {
    console.error(
      "---------------------------------------------------------------------"
    );
    console.error(`Job ID: ${job.id} failed`);
    console.error(`Error: ${err.message}`);
    logFailedEmailSent(job.name, job.data.user.email, job.attemptsMade);
  });

  queue.on("stalled", (job) => {
    console.warn(
      "---------------------------------------------------------------------"
    );
    console.warn(`Job ID: ${job.id} stalled. Re-attempting...`);
  });
};

// Setup queue events
setupQueueEvents(emailQueue);
