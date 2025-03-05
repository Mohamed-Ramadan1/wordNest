import { Job } from "bull";

import {
  sendWelcomeEmail,
  sendNewVerificationEmail,
  sendVerificationSuccessEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
  sendFailedLoginAttemptsEmail,
} from "@features/auth/emails";

//emails from users feature
import {
  sendDeactivationConfirmationEmail,
  sendDeactivationAccountSuccess,
  sendReactivationConfirmationEmail,
  sendReactivationSuccessEmail,
  sendDeletionAccountSuccess,
  sendDeletionConfirmationEmail,
  sendChangeEmailRequestEmail,
  sendNewEmailVerificationEmail,
  sendEmailChangeSuccessEmail,
  sendAccountLockedEmail,
  sendAccountUnlockedEmail,
  sendAccountBannedEmail,
  sendAccountUnbannedEmail,
} from "@features/users_feature/emails";

import { logFailedEmailSent } from "@logging/index";
import { EmailQueueJobs } from "@jobs/constants/emailQueueJobs";

// Map email types to their corresponding sending functions
export const emailHandlers = {
  [EmailQueueJobs.WelcomeEmail]: sendWelcomeEmail,
  [EmailQueueJobs.SendAccountVerifiedEmail]: sendVerificationSuccessEmail,
  [EmailQueueJobs.ResendVerificationEmail]: sendNewVerificationEmail,
  [EmailQueueJobs.RequestPasswordReset]: sendForgotPasswordEmail,
  [EmailQueueJobs.ResetPassword]: sendPasswordChangedEmail,
  [EmailQueueJobs.DeactivateAccountRequest]: sendDeactivationConfirmationEmail,
  [EmailQueueJobs.DeactivateAccountConfirmation]:
    sendDeactivationAccountSuccess,
  [EmailQueueJobs.ReactivateAccountConfirm]: sendReactivationConfirmationEmail,
  [EmailQueueJobs.ReactivateAccountSuccess]: sendReactivationSuccessEmail,
  [EmailQueueJobs.DeleteAccountRequest]: sendDeletionConfirmationEmail,
  [EmailQueueJobs.DeleteAccountConfirm]: sendDeletionAccountSuccess,
  [EmailQueueJobs.ChangeAccountEmailRequest]: sendChangeEmailRequestEmail,
  [EmailQueueJobs.NewAccountConfirmationEmail]: sendNewEmailVerificationEmail,
  [EmailQueueJobs.ChangeAccountEmailChangeSuccess]: sendEmailChangeSuccessEmail,
  [EmailQueueJobs.LockUserAccount]: sendAccountLockedEmail,
  [EmailQueueJobs.UnlockUserAccount]: sendAccountUnlockedEmail,
  [EmailQueueJobs.AccountBanned]: sendAccountBannedEmail,
  [EmailQueueJobs.AccountUnbanned]: sendAccountUnbannedEmail,
  [EmailQueueJobs.FailedLoginAttempts]: sendFailedLoginAttemptsEmail,
};

// Generic email processor function
export const sendEmailsProcessor = async (job: Job) => {
  const { user } = job.data;
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    const emailHandler = emailHandlers[job.name as EmailQueueJobs];

    if (!emailHandler) {
      throw new Error(`No handler found for email type: ${job.name}`);
    }

    console.log(`Sending ${job.name} email to: ${user.email}`);
    await emailHandler(user);

    return `${job.name} email successfully sent to ${user.email}`;
  } catch (err) {
    console.error(`Error processing job ID ${job.id}:`, err);
    logFailedEmailSent(job.name, user.email, job.attemptsMade);
    throw err;
  }
};
