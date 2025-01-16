import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";

// Configure Winston logger
const emailVerificationLogger: Logger = createLogger("emailVerification");

// Log fail attempts to send emails to the users
export function logFailedEmailVerification(
  userEmail: string,
  user_id: ObjectId,
  userJoinedAt: Date,
  errMessage: string
) {
  emailVerificationLogger.error("Failed to verify user  email", {
    event: "email_verification_failed",
    user: userEmail,
    user_id: user_id,
    userJoinedAt: userJoinedAt,
    error: errMessage,
    timestamp: new Date().toISOString(),
  });
}

// Log successful email verification
export function logSuccessfulEmailVerification(
  userEmail: string,
  user_id: ObjectId,
  userJoinedAt: Date,
  emailVerifiedAt: Date
) {
  emailVerificationLogger.info("User email verified", {
    event: "email_verification_success",
    user: userEmail,
    user_id: user_id,
    userJoinedAt: userJoinedAt,
    emailVerifiedAt: emailVerifiedAt,
    timestamp: new Date().toISOString(),
  });
}

//Log successful resend verification email
export function logSuccessfulEmailResend(
  userEmail: string,
  user_id: ObjectId,
  userJoinedAt: Date
) {
  emailVerificationLogger.info("User email verification resend", {
    event: "email_verification_resend_success",
    user: userEmail,
    user_id: user_id,
    userJoinedAt: userJoinedAt,
    timestamp: new Date().toISOString(),
  });
}

//Log failed resend verification email
export function logFailedEmailResend(
  userEmail: string,
  user_id: ObjectId,
  userJoinedAt: Date,
  errMessage: string
) {
  emailVerificationLogger.error("Failed to resend verification email", {
    event: "email_verification_resend_failed",
    user: userEmail,
    user_id: user_id,
    userJoinedAt: userJoinedAt,
    error: errMessage,
    timestamp: new Date().toISOString(),
  });
}
