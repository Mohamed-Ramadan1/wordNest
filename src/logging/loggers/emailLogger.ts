import winston from "winston";
import { jsonFormatter } from "@logging/formatters/jsonFormatter";

const logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/email-logs.log" }),
  ],
});

// Log fail attempts  to send emails to the users
export function logFailedEmailSent(emailType: string, userEmail: string) {
  logger.error("Failed to send email", {
    event: "email_failed",
    type: emailType,
    user: userEmail,
    timestamp: new Date().toISOString(),
  });
}
