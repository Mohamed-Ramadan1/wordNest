import { AppError } from "@utils/appError";
import { IUser } from "@features/users/interfaces/user.interface";
import UserModel from "@features/users/models/user.model";
const MAX_EMAIL_CHANGE_REQUESTS: number = 4;
// const COOLDOWN_PERIOD: number = 48 * 60 * 60 * 1000;

// coldown of 1 minute to testing
const COOLDOWN_PERIOD: number = 1 * 60 * 1000;

/**
 * Validate that the new email is not the same as the current email.
 */
export function validateNewEmail(user: IUser, newEmail: string): void {
  if (user.email === newEmail) {
    throw new AppError("You cannot change to the same email address.", 400);
  }
}

/**
 * Check if the email already exists in the database.
 */
export async function checkIfEmailExists(newEmail: string): Promise<void> {
  const isEmailInUse = await UserModel.exists({ email: newEmail });
  if (isEmailInUse) {
    throw new AppError("This email address is already in use.", 400);
  }
}

/**
 * Handle cooldown period and reset email change request count if necessary.
 */
export async function handleCooldownAndReset(user: IUser): Promise<void> {
  const hasCooldownElapsed =
    user.lastChangeEmailRequestAt &&
    Date.now() - user.lastChangeEmailRequestAt.getTime() >= COOLDOWN_PERIOD;

  if (
    user.changeEmailRequestCount &&
    user.changeEmailRequestCount >= MAX_EMAIL_CHANGE_REQUESTS &&
    hasCooldownElapsed
  ) {
    user.changeEmailRequestCount = 0;
    user.lastChangeEmailRequestAt = new Date();
    await user.save();
  }
}

/**
 * Enforce the maximum number of email change requests.
 */
export function enforceEmailChangeLimit(user: IUser): void {
  if (
    user.changeEmailRequestCount &&
    user.changeEmailRequestCount >= MAX_EMAIL_CHANGE_REQUESTS
  ) {
    throw new AppError(
      "You have reached the maximum number of email change requests.",
      400
    );
  }

  if (
    user.emailChangeLockedUntil &&
    user.emailChangeLockedUntil.getTime() > Date.now()
  ) {
    const retryDate = user.emailChangeLockedUntil.toLocaleDateString();
    throw new AppError(
      `You can only change your email once every 100 days. Try again on ${retryDate}.`,
      400
    );
  }
}
