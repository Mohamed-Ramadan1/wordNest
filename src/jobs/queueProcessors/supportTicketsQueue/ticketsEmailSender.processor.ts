// ticketsEmailSender.processor.ts
import { Job } from "bull";

import { AppError } from "@shared/index";
import { EmailLogger } from "@logging/index";
import { SupportTicketQueueJobs } from "@jobs/constants/supportTicketQueueJobs";

import {
  sendTicketCreationEmail,
  sendUserResponseConfirmationEmail,
  sendAdminResponseEmail,
  sendTicketClosedEmail,
  sendTicketReopenedEmail,
} from "@features/supportTickets/emails";

const emailLogger = new EmailLogger();

export const supportTicketHandlers = {
  [SupportTicketQueueJobs.SendTicketCreationEmail]: sendTicketCreationEmail,
  [SupportTicketQueueJobs.SendUserResponseConfirmationEmail]:
    sendUserResponseConfirmationEmail,
  [SupportTicketQueueJobs.SendAdminResponseEmail]: sendAdminResponseEmail,
  [SupportTicketQueueJobs.SendTicketClosedEmail]: sendTicketClosedEmail,
  [SupportTicketQueueJobs.SendTicketReopenedEmail]: sendTicketReopenedEmail,
};

export const ticketsEmailSenderProcessor = async (job: Job) => {
  const { user, supportTicket } = job.data;

  if (!user || !supportTicket) {
    throw new AppError(
      "Missing required data to send email (user / supportTicket)",
      400
    );
  }
  try {
    // Get the appropriate handler for the job type
    const emailHandler =
      supportTicketHandlers[job.name as keyof typeof supportTicketHandlers];

    if (!emailHandler) {
      throw new AppError(`No handler found for job type: ${job.name}`, 404);
    }

    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    // Call the handler with the required arguments
    await emailHandler(supportTicket, user);

    return `${job.name} email successfully sent to ${user.email}`;
  } catch (err: any) {
    console.error(`Error processing job ID ${job.id}:`, err);
    emailLogger.logFailedEmailSent(job.name, user.email, job.attemptsMade);
    throw new AppError(err.message, 500);
  }
};
