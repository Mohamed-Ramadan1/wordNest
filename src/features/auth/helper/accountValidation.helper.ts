// src/features/auth/helper/accountValidation.helper.ts

import { IUser } from "@features/users";
import { AppError } from "@shared/index";
import { emailQueue, EmailQueueJobs } from "@jobs/index";

// Constants for reactivation logic
const MAX_REACTIVATION_ATTEMPTS = 4;
const REACTIVATION_WAIT_HOURS = 48;

// Constants for login lock logic
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCK_DURATION = 30 * 60 * 1000;

export const checkAccountDeletionStatus = (user: IUser): void => {
  if (user.userAccountToBeDeleted) {
    throw new AppError(
      "This account is in the grace period for deletion. Please contact support to restore your account before the end of grace period.",
      401
    );
  }
};

export const checkAccountLockStatus = (user: IUser): void => {
  if (user.isAccountLocked) {
    throw new AppError(
      "Your account is locked. Please contact support to unlock your account or create an appeal request.",
      401
    );
  }
};

export const handleInactiveAccount = async (user: IUser): Promise<void> => {
  if (!user.isActive) {
    // Check if user has reached max reactivation attempts
    if (user.reactivationRequestCount >= MAX_REACTIVATION_ATTEMPTS) {
      const lastRequestDate = user.lastReactivationRequestAt;
      const hoursElapsed = lastRequestDate
        ? Math.abs(new Date().getTime() - lastRequestDate.getTime()) /
          (1000 * 60 * 60)
        : 0;

      if (hoursElapsed < REACTIVATION_WAIT_HOURS) {
        throw new AppError(
          `Your account is inactive. You've reached the maximum reactivation attempts. ` +
            `Please wait ${Math.ceil(REACTIVATION_WAIT_HOURS - hoursElapsed)} hours before trying again. ` +
            `If you haven't received the emails, check your spam folder or contact support.`,
          401
        );
      }

      // Reset reactivation attempts after the wait period
      user.reactivationRequestCount = 0;
    }

    // Generate reactivation token and update counts
    user.createReactivationAccountToken();
    await user.save({ validateBeforeSave: false });

    // Add reactivation email to the queue
    await emailQueue.add(EmailQueueJobs.ReactivateAccountConfirm, { user });

    throw new AppError(
      "Account is deactivated. We've sent you an email with instructions to reactivate your account.",
      401
    );
  }
};

export const checkAccountLoginLockedStatus = async (
  user: IUser
): Promise<void> => {
  const currentTime = new Date();

  // If the account is already locked, check if the lock duration has expired
  if (user.loginAttemptsBlocked) {
    const blockedUntil = user.loginAttemptsBlockedUntil
      ? new Date(user.loginAttemptsBlockedUntil)
      : null;

    if (blockedUntil && currentTime < blockedUntil) {
      const timeRemaining = Math.ceil(
        (blockedUntil.getTime() - currentTime.getTime()) / (1000 * 60 * 60)
      );

      throw new AppError(
        `Your account is locked due to multiple failed login attempts. Please wait ` +
          `${timeRemaining} hours before trying again.`,
        401
      );
    }

    // If lock duration has passed, reset login state
    user.loginAttempts = 0;
    user.loginAttemptsBlocked = false;
    user.loginAttemptsBlockedUntil = undefined;
    await user.save({ validateBeforeSave: false });
  }
};

export const lockAccountLogin = async (user: IUser): Promise<void> => {
  if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
    // Lock the account
    user.loginAttemptsBlocked = true;
    user.loginAttemptsBlockedUntil = new Date(Date.now() + LOGIN_LOCK_DURATION);
    emailQueue.add(EmailQueueJobs.FailedLoginAttempts, { user });
  } else {
    // Increment login attempts and update the last attempt time
    user.loginAttempts += 1;
    user.lastLoginAttemptAt = new Date();
  }

  await user.save({ validateBeforeSave: false });
};
