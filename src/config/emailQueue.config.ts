// Enum contains the enum values for the email queue process .
export enum EmailQueueType {
  WelcomeEmail = "welcomeEmail",
  ResendVerificationEmail = "resendVerificationEmail",
  SendAccountVerifiedEmail = "sendAccountVerifiedEmail",
  RequestPasswordReset = "requestPasswordReset",
  ResetPassword = "resetPassword",
  DeactivateAccountRequest = "deactivateAccountRequest",
  DeactivateAccountConfirmation = "deactivateAccountConfirmation",
  ReactivateAccountConfirm = "reactivateAccountConfirm",
  ReactivateAccountSuccess = "reactivateAccountSuccess",
  DeleteAccountRequest = "deleteAccountRequest",
  DeleteAccountConfirm = "deleteAccountConfirm",
}
