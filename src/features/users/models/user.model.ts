import { Schema, Model, model } from "mongoose";
import {
  IUser,
  Roles,
  defaultProfilePicture,
} from "../interfaces/user.interface";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 * Mongoose schema for the User model, representing a user in the system.
 * @typedef {Object} IUserSchema
 */
const userSchema: Schema = new Schema<IUser>(
  {
    /** User's first name */
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [20, "First name must be less than 20 characters"],
    },
    /** User's last name */
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [20, "Last name must be less than 20 characters"],
    },
    /** User's biography or description */
    bio: { type: String, default: "", min: 0, max: 500 },

    /** User's email address */
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      validate: {
        validator: (email: string) => isEmail(email),
        message: "Invalid email format",
      },
    },
    /** Token for email verification */
    emailVerificationToken: { type: String },
    /** Expiration date for email verification token */
    emailVerificationExpires: { type: Date, default: undefined },
    /** Date when email was verified */
    emailVerifiedAt: { type: Date, default: undefined },
    /** Count of verification token resend attempts */
    resendVerificationTokenCount: { type: Number, default: 0 },
    /** Last time a verification email was sent */
    lastVerificationEmailSentAt: { type: Date, default: undefined },
    /** Indicates if the email is verified */
    emailVerified: { type: Boolean, default: false },

    /** Token for email reset */
    emailResetToken: { type: String, default: undefined },
    /** Expiration date for email reset token */
    emailResetTokenExpiredAt: { type: Date, default: undefined },

    /** Indicates if the account is active */
    isActive: { type: Boolean, default: true },
    /** Token for account deactivation */
    deactivationAccountToken: { type: String, default: undefined },
    /** Expiration date for deactivation token */
    deactivationAccountTokenExpiredAt: { type: Date, default: undefined },
    /** Last deactivation request date */
    lastDeactivationRequestAt: { type: Date, default: undefined },
    /** Count of deactivation requests */
    deactivationRequestCount: { type: Number, default: 0 },
    /** Token for account reactivation */
    reactivationAccountToken: { type: String, default: undefined },
    /** Expiration date for reactivation token */
    reactivationAccountTokenExpiredAt: { type: Date, default: undefined },
    /** Last reactivation request date */
    lastReactivationRequestAt: { type: Date, default: undefined },
    /** Count of reactivation requests */
    reactivationRequestCount: { type: Number, default: 0 },

    // Change email related attributes
    /** Token for email change request */
    changeEmailRequestToken: { type: String, default: undefined },
    /** Expiration date for email change verification token */
    changeEmailVerificationTokenExpiresAt: { type: Date, default: undefined },
    /** Count of email change requests */
    changeEmailRequestCount: { type: Number, default: 0 },
    /** Date when email change was confirmed */
    changeEmailRequestConfirmedAt: { type: Date, default: undefined },
    /** Last email change request date */
    lastChangeEmailRequestAt: { type: Date, default: undefined },
    /** Indicates if the email change request is confirmed */
    isChangeEmailRequestConfirmed: { type: Boolean, default: false },
    /** Temporary email address during change process */
    tempChangedEmail: { type: String, default: undefined },
    /** Verification token for temporary email */
    tempChangeEmailVerificationToken: { type: String, default: undefined },
    /** Date when temporary email verification token was sent */
    tempChangedEmailVerificationTokenSentAt: { type: Date, default: undefined },
    /** Last time temporary email verification token was sent */
    lastTempChangedEmailVerificationTokenSentAt: {
      type: Date,
      default: undefined,
    },
    /** Expiration date for temporary email verification token */
    tempChangedEmailVerificationTokenExpiresAt: {
      type: Date,
      default: undefined,
    },
    /** Count of temporary email verification token requests */
    tempChangedEmailVerificationTokenCount: { type: Number, default: 0 },
    /** Date when temporary email was verified */
    tempChangedEmailVerifiedAt: { type: Date, default: undefined },
    /** List of previous email addresses */
    previousEmails: [
      {
        email: { type: String, required: true },
        changedAt: { type: Date, required: true },
      },
    ],
    /** Date until email changes are locked */
    emailChangeLockedUntil: { type: Date, default: undefined },

    /** Token for account deletion request */
    deleteAccountRequestToken: { type: String, default: undefined },
    /** Expiration date for deletion request token */
    deleteAccountRequestTokenExpiredAt: { type: Date, default: undefined },
    /** Count of account deletion requests */
    deleteAccountRequestCount: { type: Number, default: 0 },
    /** Last account deletion request date */
    lastDeleteAccountRequestAt: { type: Date, default: undefined },
    /** Date when account deletion was confirmed */
    deleteAccountConfirmedAt: { type: Date, default: undefined },
    /** Indicates if the account is marked for deletion */
    userAccountToBeDeleted: { type: Boolean, default: false },
    /** Date when the account was deleted */
    userAccountDeletedAt: { type: Date, default: undefined },

    /** Indicates if the account is locked */
    isAccountLocked: { type: Boolean, default: false },
    /** Date when the account was locked */
    accountLockedAt: { type: Date, default: undefined },
    /** Email of the admin who locked the account */
    accountLockedByAdminEmail: { type: String, default: undefined },
    /** Reason for locking the account */
    accountLockedReason: { type: String, default: undefined },
    /** Date when the account was unlocked */
    accountUnlockedAt: { type: Date, default: undefined },
    /** Email of the admin who unlocked the account */
    accountUnlockedBy: { type: String, default: undefined },
    /** Comment for unlocking the account */
    accountUnlockedComment: { type: String, default: undefined },

    /** Indicates if the account is banned */
    isAccountBanned: { type: Boolean, default: false },
    /** Date when the account was banned */
    accountBannedAt: { type: Date, default: undefined },
    /** Duration of the ban in days */
    accountBandPeriodDays: { type: Number, default: undefined },
    /** Email of the admin who banned the account */
    accountBannedByAdminEmail: { type: String, default: undefined },
    /** Reason for banning the account */
    accountBannedReason: { type: String, default: undefined },
    /** Date when the account was unbanned */
    accountUnbannedAt: { type: Date, default: undefined },
    /** Email of the admin who unbanned the account */
    accountUnbannedBy: { type: String, default: undefined },
    /** Comment for unbanning the account */
    accountUnbannedComment: { type: String, default: undefined },

    /** Number of users this user is following */
    following: { type: Number, default: 0 },
    /** List of user IDs this user is following */
    followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    /** Number of followers this user has */
    followers: { type: Number, default: 0 },
    /** List of user IDs following this user */
    followerIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    /** URL or path to the user's profile picture */
    profilePicture: { type: String, default: defaultProfilePicture },
    /** ID of the profile picture (e.g., in a storage system) */
    profilePictureId: { type: String, default: "" },
    /** User's password (hashed) */
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Excluded from queries by default
    },
    /** Date when the password was last changed */
    passwordChangedAt: { type: Date, default: undefined },
    /** Token for password reset */
    passwordResetToken: { type: String, default: undefined },
    /** Expiration date for password reset token */
    passwordResetTokenExpiredAt: { type: Date, default: undefined },
    /** Count of password reset requests */
    passwordResetRequestsAttempts: { type: Number, default: 0 },
    /** Last password reset request attempt date */
    passwordLastResetRequestAttemptDate: { type: Date, default: undefined },
    /** User roles (e.g., User, Admin) */
    roles: {
      type: [String],
      enum: Object.values(Roles),
      default: [Roles.User],
      index: true,
    },
    /** IP address of the last login */
    lastLoginIP: { type: String, default: undefined },
    /** Date of the last login */
    lastLoginAt: { type: Date, default: undefined },
    /** Number of login attempts */
    loginAttempts: { type: Number, default: 0 },
    /** Date until login attempts are blocked */
    loginAttemptsBlockedUntil: { type: Date, default: undefined },
    /** Indicates if login attempts are blocked */
    loginAttemptsBlocked: { type: Boolean, default: false },
    /** Date of the last login attempt */
    lastLoginAttemptAt: { type: Date, default: undefined },
    /** Indicates if notifications are enabled */
    notificationsEnabled: { type: Boolean, default: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

/**
 * Index for text search on email field
 */
userSchema.index({ email: "text" });
/**
 * Index for filtering active accounts
 */
userSchema.index({ isActive: 1 });

/**
 * Pre-save hook to hash the password if modified.
 * @param next - Callback to proceed with the save operation
 */
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Generates an email verification token and sets expiration.
 * @returns The generated token
 */
userSchema.methods.createEmailVerificationToken = function (): string {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = token;
  this.emailVerificationExpires = Date.now() + 3600000; // 1 hour
  return token;
};

/**
 * Compares a candidate password with the stored hashed password.
 * @param candidatePassword - The password to compare
 * @param userPassword - The stored hashed password
 * @returns A promise resolving to true if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

/**
 * Generates a password reset token and updates related fields.
 */
userSchema.methods.createPasswordResetToken = function (): void {
  this.passwordResetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  this.passwordResetRequestsAttempts++;
  this.passwordLastResetRequestAttemptDate = new Date();
};

/**
 * Generates a deactivation account token and updates related fields.
 */
userSchema.methods.createDeactivationAccountToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.deactivationAccountToken = token;
  this.deactivationAccountTokenExpiredAt = Date.now() + 3600000; // 1 hour
  this.lastDeactivationRequestAt = new Date();
  this.deactivationRequestCount++;
};

/**
 * Generates a reactivation account token and updates related fields.
 */
userSchema.methods.createReactivationAccountToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.reactivationAccountToken = token;
  this.reactivationAccountTokenExpiredAt = Date.now() + 3600000; // 1 hour
  this.lastReactivationRequestAt = new Date();
  this.reactivationRequestCount++;
};

/**
 * Generates a delete account request token and updates related fields.
 */
userSchema.methods.createDeleteAccountRequestToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.deleteAccountRequestToken = token;
  this.deleteAccountRequestTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
  this.lastDeleteAccountRequestAt = new Date();
  this.deleteAccountRequestCount++;
};

/**
 * Generates an email change request token and updates related fields.
 */
userSchema.methods.createChangeEmailRequestToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.changeEmailRequestToken = token;
  this.changeEmailVerificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
  this.lastChangeEmailRequestAt = new Date();
  this.changeEmailRequestCount++;
};

/**
 * Resets email change request token and related fields.
 */
userSchema.methods.resetChangeEmailRequestToken = function (): void {
  this.changeEmailRequestToken = undefined;
  this.changeEmailVerificationTokenExpiresAt = undefined;
  this.lastChangeEmailRequestAt = undefined;
  this.changeEmailRequestCount = 0;
};

/**
 * Generates a temporary email verification token and updates related fields.
 */
userSchema.methods.createTempChangedEmailVerificationToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.tempChangeEmailVerificationToken = token;
  this.tempChangedEmailVerificationTokenSentAt = new Date();
  this.tempChangedEmailVerificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
  this.lastTempChangedEmailVerificationTokenSentAt = new Date();
  this.tempChangedEmailVerificationTokenCount++;
};

/**
 * Resets temporary email verification token and related fields.
 */
userSchema.methods.resetTempChangedEmailVerificationToken = function (): void {
  this.tempChangeEmailVerificationToken = undefined;
  this.tempChangedEmailVerificationTokenSentAt = undefined;
  this.tempChangedEmailVerificationTokenExpiresAt = undefined;
  this.lastTempChangedEmailVerificationTokenSentAt = undefined;
  this.tempChangedEmailVerificationTokenCount = 0;
};

/**
 * Mongoose model for the User collection.
 * @type {Model<IUser>}
 */
const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export default UserModel;
