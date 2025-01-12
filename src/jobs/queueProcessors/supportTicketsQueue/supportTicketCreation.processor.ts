// emails imports
import { sendTicketCreationEmail } from "@features/supportTickets/emails";
import { AppError } from "@utils/appError";

// BULL imports
import { Job } from "bull";

// import logger
import { logFailedEmailSent } from "@logging/index";

export const sendSupportTicketCreationEmailProcessor = async (job: Job) => {
  const { user, supportTicket } = job.data;
  try {
    if (!user || !supportTicket) {
      throw new AppError(
        "Missing required data to send email (userEmail / supportTicket)",
        400
      );
    }
    await sendTicketCreationEmail(supportTicket, user);
  } catch (err: any) {
    logFailedEmailSent(
      "sendSupportTicketCreationEmail",
      user.email,
      job.attemptsMade
    );
    throw new AppError(err.message, 500);
  }
};
