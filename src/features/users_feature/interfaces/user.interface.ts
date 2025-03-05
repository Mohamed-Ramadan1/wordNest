import { Document, ObjectId } from "mongoose";

export enum Roles {
  User = "user",
  Admin = "admin",
  BlogAdmin = "blog-admin",
}

export enum AccountStatus {}

export const defaultProfilePicture: string =
  "https://res.cloudinary.com/deqgzvkxp/image/upload/v1718812055/defaultProileImg_j1ilwv.png";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: String;
  lastName: string;
  email: string;
  emailVerificationToken: string | undefined;
  emailVerificationExpires: Date | undefined;
  emailVerifiedAt: Date;
  emailVerified: boolean;
  emailResetToken: string;
  resendVerificationTokenCount: number;
  lastVerificationEmailSentAt: Date;
  emailResetTokenExpiredAt: Date;
  isActive: boolean;
  deactivationAccountToken: string | undefined;
  deactivationAccountTokenExpiredAt: Date | undefined;
  lastDeactivationRequestAt: Date | undefined;
  deactivationRequestCount: number;
  reactivationAccountToken: string | undefined;
  reactivationAccountTokenExpiredAt: Date | undefined;
  lastReactivationRequestAt: Date | undefined;
  reactivationRequestCount: number;

  changeEmailRequestToken: string | undefined;
  changeEmailVerificationTokenExpiresAt: Date | undefined;
  changeEmailRequestCount: number;
  lastChangeEmailRequestAt: Date | undefined;
  isChangeEmailRequestConfirmed: boolean;
  changeEmailRequestConfirmedAt: Date | undefined;
  tempChangedEmail: string | undefined;
  tempChangeEmailVerificationToken: string | undefined;
  lastTempChangedEmailVerificationTokenSentAt: Date | undefined;
  tempChangedEmailVerificationTokenSentAt: Date | undefined;
  tempChangedEmailVerificationTokenExpiresAt: Date | undefined;
  tempChangedEmailVerificationTokenCount: number;
  tempChangedEmailVerifiedAt: Date | undefined;

  previousEmails: { email: string; changedAt: Date }[];
  emailChangeLockedUntil: Date | undefined;

  deleteAccountRequestToken: string | undefined;
  deleteAccountRequestTokenExpiredAt: Date | undefined;
  deleteAccountRequestCount: number | undefined;
  lastDeleteAccountRequestAt: Date | undefined;
  deleteAccountConfirmedAt: Date | undefined;
  userAccountToBeDeleted: boolean;
  userAccountDeletedAt: Date | undefined;

  // Social attributes
  following: number;
  followingIds: ObjectId[];
  followers: number;
  followerIds: ObjectId[];

  // Profile
  bio: string;
  profilePicture: string;
  profilePictureId: string;

  // Password management
  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetTokenExpiredAt: Date;
  passwordResetRequestsAttempts: number;
  passwordLastResetRequestAttemptDate: Date;

  // lock accounts
  isAccountLocked: boolean | undefined;
  accountLockedAt: Date | undefined;
  accountLockedByAdminEmail: string | undefined;
  accountLockedReason: string | undefined;
  // un lock accounts attributes
  accountUnlockedAt: Date | undefined;
  accountUnlockedBy: string | undefined;
  accountUnlockedComment: string | undefined;

  // ban user accounts
  isAccountBanned: boolean | undefined;
  accountBannedAt: Date | undefined;
  accountBannedByAdminEmail: string | undefined;
  accountBannedReason: string | undefined;
  accountBandPeriodDays: number | undefined;

  accountUnbannedAt: Date | undefined;
  accountUnbannedBy: string | undefined;
  accountUnbannedComment: string | undefined;

  // Preferences
  notificationsEnabled: boolean;
  roles: Roles[];

  // Tracking
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | undefined;
  lastLoginIP: string | undefined;
  loginAttempts: number;
  loginAttemptsBlockedUntil: Date | undefined;
  loginAttemptsBlocked: boolean;
  lastLoginAttemptAt: Date | undefined;

  // Methods
  createEmailVerificationToken(): string;
  createPasswordResetToken(): void;
  createDeactivationAccountToken(): void;
  createReactivationAccountToken(): void;
  createDeleteAccountRequestToken(): void;
  createChangeEmailRequestToken(): void;
  createTempChangedEmailVerificationToken(): void;
  resetChangeEmailRequestToken(): void;
  resetTempChangedEmailVerificationToken(): void;
  comparePassword(candidatePassword: string, userPassword: string): boolean;
}
