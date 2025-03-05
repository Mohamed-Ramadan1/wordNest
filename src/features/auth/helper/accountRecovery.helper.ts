import { IUser } from "@features/users_feature";
import { AppError } from "@utils/appError";

export const checkResendVerificationEmailAttempts = async (
  user: IUser
): Promise<void> => {
  const MAX_ATTEMPTS = 4;
  const TIME_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const now = Date.now();

  const { resendVerificationTokenCount, lastVerificationEmailSentAt } = user;

  // Ensure lastVerificationEmailSentAt exists and calculate time difference
  const lastAttemptTime = lastVerificationEmailSentAt?.getTime() || 0;
  const timeSinceLastAttempt = now - lastAttemptTime;

  if (
    resendVerificationTokenCount >= MAX_ATTEMPTS &&
    timeSinceLastAttempt < TIME_WINDOW_MS
  ) {
    throw new AppError(
      `You can only request a verification email ${MAX_ATTEMPTS} times every 4 hours.`,
      429 // HTTP Status Code for Too Many Requests
    );
  }

  // Reset the count if the time window has passed
  if (timeSinceLastAttempt >= TIME_WINDOW_MS) {
    user.resendVerificationTokenCount = 0; // Reset attempt counter
    await user.save();
  }
};

export const checkResetPasswordAttempts = async (
  user: IUser
): Promise<void> => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Define 24 hours in milliseconds
  const now = new Date().getTime(); // Current timestamp
  const lastAttempt = new Date(
    user.passwordLastResetRequestAttemptDate
  ).getTime();

  // Reset attempts if 1 or fewer attempts were made and 24 hours have passed since the last attempt
  if (
    user.passwordResetRequestsAttempts <= 1 &&
    user.passwordLastResetRequestAttemptDate &&
    now - lastAttempt >= oneDayInMilliseconds
  ) {
    user.passwordResetRequestsAttempts = 0;
    await user.save();
  }

  // Restrict if 2 or more attempts were made within the last 24 hours
  if (
    user.passwordResetRequestsAttempts >= 2 &&
    user.passwordLastResetRequestAttemptDate &&
    now - lastAttempt < oneDayInMilliseconds
  ) {
    throw new AppError(
      "You can only request a password reset twice within 24 hours.",
      429 // HTTP Status Code for Too Many Requests
    );
  }
};
