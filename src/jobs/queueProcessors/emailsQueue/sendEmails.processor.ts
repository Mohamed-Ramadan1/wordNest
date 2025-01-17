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
} from "@features/users/emails";

import { logFailedEmailSent } from "@logging/index";
import { EmailQueueType } from "@config/emailQueue.config";

// Map email types to their corresponding sending functions
export const emailHandlers = {
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
  [EmailQueueType.DeleteAccountRequest]: sendDeletionConfirmationEmail,
  [EmailQueueType.DeleteAccountConfirm]: sendDeletionAccountSuccess,
  [EmailQueueType.ChangeAccountEmailRequest]: sendChangeEmailRequestEmail,
  [EmailQueueType.NewAccountConfirmationEmail]: sendNewEmailVerificationEmail,
  [EmailQueueType.ChangeAccountEmailChangeSuccess]: sendEmailChangeSuccessEmail,
  [EmailQueueType.LockUserAccount]: sendAccountLockedEmail,
  [EmailQueueType.UnlockUserAccount]: sendAccountUnlockedEmail,
  [EmailQueueType.AccountBanned]: sendAccountBannedEmail,
  [EmailQueueType.AccountUnbanned]: sendAccountUnbannedEmail,
  [EmailQueueType.FailedLoginAttempts]: sendFailedLoginAttemptsEmail,
};

// Generic email processor function
export const sendEmailsProcessor = async (job: Job) => {
  const { user } = job.data;
  try {
    console.log(`Processing Job ID: ${job.id}`);
    console.log(`Job Data:`, job.data);

    const emailHandler = emailHandlers[job.name as EmailQueueType];

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
