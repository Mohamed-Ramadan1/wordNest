import { Document, ObjectId } from "mongoose";

/**
 * Enum representing user roles in the system
 * @enum {string}
 */
export enum Roles {
  User = "user",
  Admin = "admin",
  BlogAdmin = "blog-admin",
}

/**
 * Enum for account status (currently empty but reserved for future use)
 * @enum
 */
export enum AccountStatus {}

/**
 * Default profile picture URL used when user hasn't set a custom one
 * @constant {string}
 */
export const defaultProfilePicture: string =
  "https://res.cloudinary.com/deqgzvkxp/image/upload/v1718812055/defaultProileImg_j1ilwv.png";

/**
 * Interface representing a User document in MongoDB
 * @interface
 * @extends {Document}
 */
export interface IUser extends Document {
  /** Unique identifier for the user */
  _id: ObjectId;

  /** User's first name */
  firstName: String;

  /** User's last name */
  lastName: string;

  /** User's email address */
  email: string;

  /** Token for email verification */
  emailVerificationToken: string | undefined;

  /** Expiration date for email verification token */
  emailVerificationExpires: Date | undefined;

  /** Date when email was verified */
  emailVerifiedAt: Date;

  /** Whether the email has been verified */
  emailVerified: boolean;

  /** Token for email reset */
  emailResetToken: string;

  /** Number of times verification token was resent */
  resendVerificationTokenCount: number;

  /** Date of last verification email sent */
  lastVerificationEmailSentAt: Date;

  /** Expiration date for email reset token */
  emailResetTokenExpiredAt: Date;

  /** Whether the account is currently active */
  isActive: boolean;

  /** Token for account deactivation */
  deactivationAccountToken: string | undefined;

  /** Expiration date for deactivation token */
  deactivationAccountTokenExpiredAt: Date | undefined;

  /** Date of last deactivation request */
  lastDeactivationRequestAt: Date | undefined;

  /** Number of deactivation requests made */
  deactivationRequestCount: number;

  /** Token for account reactivation */
  reactivationAccountToken: string | undefined;

  /** Expiration date for reactivation token */
  reactivationAccountTokenExpiredAt: Date | undefined;

  /** Date of last reactivation request */
  lastReactivationRequestAt: Date | undefined;

  /** Number of reactivation requests made */
  reactivationRequestCount: number;

  /** Token for email change request */
  changeEmailRequestToken: string | undefined;

  /** Expiration date for email change verification token */
  changeEmailVerificationTokenExpiresAt: Date | undefined;

  /** Number of email change requests */
  changeEmailRequestCount: number;

  /** Date of last email change request */
  lastChangeEmailRequestAt: Date | undefined;

  /** Whether email change request is confirmed */
  isChangeEmailRequestConfirmed: boolean;

  /** Date when email change was confirmed */
  changeEmailRequestConfirmedAt: Date | undefined;

  /** Temporary email during change process */
  tempChangedEmail: string | undefined;

  /** Verification token for temporary email change */
  tempChangeEmailVerificationToken: string | undefined;

  /** Date when last temporary email verification token was sent */
  lastTempChangedEmailVerificationTokenSentAt: Date | undefined;

  /** Date when temporary email verification token was sent */
  tempChangedEmailVerificationTokenSentAt: Date | undefined;

  /** Expiration date for temporary email verification token */
  tempChangedEmailVerificationTokenExpiresAt: Date | undefined;

  /** Number of temporary email verification tokens sent */
  tempChangedEmailVerificationTokenCount: number;

  /** Date when temporary email was verified */
  tempChangedEmailVerifiedAt: Date | undefined;

  /** Array of previous emails with their change dates */
  previousEmails: { email: string; changedAt: Date }[];

  /** Date until email changes are locked */
  emailChangeLockedUntil: Date | undefined;

  /** Token for account deletion request */
  deleteAccountRequestToken: string | undefined;

  /** Expiration date for deletion request token */
  deleteAccountRequestTokenExpiredAt: Date | undefined;

  /** Number of account deletion requests */
  deleteAccountRequestCount: number | undefined;

  /** Date of last account deletion request */
  lastDeleteAccountRequestAt: Date | undefined;

  /** Date when account deletion was confirmed */
  deleteAccountConfirmedAt: Date | undefined;

  /** Whether account is scheduled for deletion */
  userAccountToBeDeleted: boolean;

  /** Date when account was deleted */
  userAccountDeletedAt: Date | undefined;

  // Social attributes
  /** Number of users this user is following */
  following: number;

  /** Array of user IDs this user is following */
  followingIds: ObjectId[];

  /** Number of followers this user has */
  followers: number;

  /** Array of user IDs following this user */
  followerIds: ObjectId[];

  // Profile
  /** User's biography */
  bio: string;

  /** URL to user's profile picture */
  profilePicture: string;

  /** Cloudinary ID for profile picture */
  profilePictureId: string;

  // Password management
  /** Hashed user password */
  password: string;

  /** Date when password was last changed */
  passwordChangedAt: Date;

  /** Token for password reset */
  passwordResetToken: string;

  /** Expiration date for password reset token */
  passwordResetTokenExpiredAt: Date;

  /** Number of password reset attempts */
  passwordResetRequestsAttempts: number;

  /** Date of last password reset attempt */
  passwordLastResetRequestAttemptDate: Date;

  // Lock accounts
  /** Whether the account is currently locked */
  isAccountLocked: boolean | undefined;

  /** Date when account was locked */
  accountLockedAt: Date | undefined;

  /** Email of admin who locked the account */
  accountLockedByAdminEmail: string | undefined;

  /** Reason for account lock */
  accountLockedReason: string | undefined;

  // Unlock accounts attributes
  /** Date when account was unlocked */
  accountUnlockedAt: Date | undefined;

  /** Email of admin who unlocked the account */
  accountUnlockedBy: string | undefined;

  /** Comment about account unlocking */
  accountUnlockedComment: string | undefined;

  // Ban user accounts
  /** Whether the account is currently banned */
  isAccountBanned: boolean | undefined;

  /** Date until account is banned */
  accountBannedUntil: Date | undefined;

  /** Date when account was banned */
  accountBannedAt: Date | undefined;

  /** Email of admin who banned the account */
  accountBannedByAdminEmail: string | undefined;

  /** Reason for account ban */
  accountBannedReason: string | undefined;

  /** Duration of ban in days */
  accountBandPeriodDays: number | undefined;

  /** Date when account was unbanned */
  accountUnbannedAt: Date | undefined;

  /** Email of admin who unbanned the account */
  accountUnbannedBy: string | undefined;

  /** Comment about account unbanning */
  accountUnbannedComment: string | undefined;

  // Preferences
  /** Whether notifications are enabled for the user */
  notificationsEnabled: boolean;

  /** Array of roles assigned to the user */
  roles: Roles[];

  // Tracking
  /** Date when user was created */
  createdAt: Date;

  /** Date when user was last updated */
  updatedAt: Date;

  /** Date of last user login */
  lastLoginAt: Date | undefined;

  /** IP address of last login */
  lastLoginIP: string | undefined;

  /** Number of login attempts */
  loginAttempts: number;

  /** Date until login attempts are blocked */
  loginAttemptsBlockedUntil: Date | undefined;

  /** Whether login attempts are currently blocked */
  loginAttemptsBlocked: boolean;

  /** Date of last login attempt */
  lastLoginAttemptAt: Date | undefined;

  // Methods
  /** Creates and returns a new email verification token */
  createEmailVerificationToken(): string;

  /** Creates a new password reset token */
  createPasswordResetToken(): void;

  /** Creates a new account deactivation token */
  createDeactivationAccountToken(): void;

  /** Creates a new account reactivation token */
  createReactivationAccountToken(): void;

  /** Creates a new account deletion request token */
  createDeleteAccountRequestToken(): void;

  /** Creates a new email change request token */
  createChangeEmailRequestToken(): void;

  /** Creates a new temporary email verification token */
  createTempChangedEmailVerificationToken(): void;

  /** Resets the email change request token */
  resetChangeEmailRequestToken(): void;

  /** Resets the temporary email verification token */
  resetTempChangedEmailVerificationToken(): void;

  /**
   * Compares a candidate password with the stored password
   * @param candidatePassword - Password to verify
   * @param userPassword - Stored hashed password
   * @returns Promise resolving to boolean indicating if passwords match
   */
  comparePassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}
