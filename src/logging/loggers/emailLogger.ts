import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
const sendEmailsLogger: Logger = createLogger("SendEmails");

// Log fail attempts  to send emails to the users
export function logFailedEmailSent(
  emailType: string,
  userEmail: string,
  attempts: number
) {
  sendEmailsLogger.error("Failed to send email", {
    event: "email_failed",
    type: emailType,
    user: userEmail,
    attempts: attempts,
    timestamp: new Date().toISOString(),
  });
}
