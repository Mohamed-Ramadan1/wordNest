import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";

// Configure Winston logger
const lockAccountsLogger: Logger = createLogger("lockAccounts");

// Log fail attempts  to send emails to the users
export function logFailedLockAccount(
  lockedEmail: string,
  reason: string,
  userId: ObjectId,
  lockedByEmail: string,
  lockedById: ObjectId,
  errorMessage: string,
  ipAddress: string | undefined
) {
  lockAccountsLogger.error({
    message: `Failed to lock account for user with email: ${lockedEmail}`,
    lockedEmail,
    reason,
    userId,
    lockedByEmail,
    lockedById,
    errorMessage,
    ipAddress: ipAddress ? ipAddress : undefined,
  });
}

// Log successful account locking
export function logSuccessfulLockAccount(
  lockedEmail: string,
  userId: ObjectId,
  lockedByEmail: string,
  lockedById: ObjectId,
  ipAddress: string | undefined
) {
  lockAccountsLogger.info({
    message: `Successfully locked account for user with email: ${lockedEmail}`,
    lockedEmail,
    userId,
    lockedByEmail,
    lockedById,
    ipAddress: ipAddress ? ipAddress : undefined,
  });
}

// Log successful account unlocking
export function logSuccessfulUnlockAccount(
  email: string,
  userId: ObjectId,
  unlockedByEmail: string,
  unlockedById: ObjectId,
  ipAddress: string | undefined
) {
  lockAccountsLogger.info({
    message: `Successfully unlocked account for user with email: ${email}`,
    email,
    userId,
    unlockedByEmail,
    unlockedById,
    ipAddress: ipAddress ? ipAddress : undefined,
  });
}

// Log failed account unlocking
export function logFailedUnlockAccount(
  email: string,
  userId: ObjectId,
  unlockedByEmail: string,
  unlockedById: ObjectId,
  errorMessage: string,
  ipAddress: string | undefined
) {
  lockAccountsLogger.error({
    message: `Failed to unlock account for user with email: ${email}`,
    email,
    userId,
    unlockedByEmail,
    unlockedById,
    errorMessage,
    ipAddress: ipAddress ? ipAddress : undefined,
  });
}
