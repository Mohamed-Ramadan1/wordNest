/**
 * Interface for logging email-related events in the system.
 */
export interface IEmailLogger {
  /**
   * Log a failed attempt to send an email.
   * @param emailType - The type of email that failed to send (e.g., welcome email, password reset email).
   * @param userEmail - The email address of the user who was supposed to receive the email.
   * @param attempts - The number of attempts made to send the email.
   */
  logFailedEmailSent(
    emailType: string,
    userEmail: string,
    attempts: number
  ): void;
}
