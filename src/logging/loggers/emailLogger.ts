import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IEmailLogger } from "@logging/interfaces";
export class EmailLogger implements IEmailLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("email");
  }

  // Log fail attempts  to send emails to the users
  public logFailedEmailSent(
    emailType: string,
    userEmail: string,
    attempts: number
  ) {
    this.logger.error("Failed to send email", {
      event: "email_failed",
      type: emailType,
      user: userEmail,
      attempts: attempts,
      timestamp: new Date().toISOString(),
    });
  }
}
