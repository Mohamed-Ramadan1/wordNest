import { Schema, Model, model } from "mongoose";
import {
  IUser,
  Roles,
  defaultProfilePicture,
} from "../interfaces/user.interface";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [20, "First name must be less than 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [20, "Last name must be less than 20 characters"],
    },
    bio: { type: String, default: "", min: 0, max: 500 },

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
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date, default: undefined },
    emailVerifiedAt: { type: Date, default: undefined },
    resendVerificationTokenCount: { type: Number, default: 0 },
    lastVerificationEmailSentAt: { type: Date, default: undefined },
    emailVerified: { type: Boolean, default: false },

    emailResetToken: { type: String, default: undefined },
    emailResetTokenExpiredAt: { type: Date, default: undefined },

    isActive: { type: Boolean, default: true },
    deactivationAccountToken: { type: String, default: undefined },
    deactivationAccountTokenExpiredAt: { type: Date, default: undefined },
    lastDeactivationRequestAt: { type: Date, default: undefined },
    deactivationRequestCount: { type: Number, default: 0 },
    reactivationAccountToken: { type: String, default: undefined },
    reactivationAccountTokenExpiredAt: { type: Date, default: undefined },
    lastReactivationRequestAt: { type: Date, default: undefined },
    reactivationRequestCount: { type: Number, default: 0 },

    // change email related feilds
    changeEmailRequestToken: { type: String, default: undefined },
    changeEmailVerificationTokenExpiresAt: { type: Date, default: undefined },
    changeEmailRequestCount: { type: Number, default: 0 },
    lastChangeEmailRequestAt: { type: Date, default: undefined },
    tempChangedEmail: { type: String, default: undefined },
    tempChangeEmailVerificationToken: { type: String, default: undefined },
    tempChangedEmailVerificationTokenSentAt: { type: Date, default: undefined },
    tempChangedEmailVerificationTokenExpiresAt: {
      type: Date,
      default: undefined,
    },
    tempChangedEmailVerificationTokenCount: { type: Number, default: 0 },
    tempChangedEmailVerifiedAt: { type: Date, default: undefined },
    previousEmails: [
      {
        email: { type: String, required: true },
        changedAt: { type: Date, required: true },
      },
    ],
    emailChangeLockedUntil: { type: Date, default: undefined },

    deleteAccountRequestToken: { type: String, default: undefined },
    deleteAccountRequestTokenExpiredAt: { type: Date, default: undefined },
    deleteAccountRequestCount: { type: Number, default: 0 },
    lastDeleteAccountRequestAt: { type: Date, default: undefined },
    deleteAccountConfirmedAt: { type: Date, default: undefined },
    userAccountToBeDeleted: { type: Boolean, default: false },
    userAccountDeletedAt: { type: Date, default: undefined },

    following: { type: Number, default: 0 },
    followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    followers: { type: Number, default: 0 },
    followerIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    profilePicture: { type: String, default: defaultProfilePicture },
    profilePictureId: { type: String, default: "" },
    password: { type: String, required: true, select: false },
    passwordChangedAt: { type: Date, default: undefined },
    passwordResetToken: { type: String, default: undefined },
    passwordResetTokenExpiredAt: {
      type: Date,
      default: undefined,
    },
    passwordResetRequestsAttempts: {
      type: Number,
      default: 0,
    },
    passwordLastResetRequestAttemptDate: { type: Date, default: undefined },
    roles: {
      type: [String],
      enum: Object.values(Roles),
      default: [Roles.User],
      index: true,
    },
    notificationsEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, isActive: 1 });

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// add method  to userSchema for verification token  generation.
userSchema.methods.createEmailVerificationToken = function (): string {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = token;
  this.emailVerificationExpires = Date.now() + 3600000; // 1 hour
  return token;
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

// method that generate password reset token and set other related attributes .
userSchema.methods.createPasswordResetToken = function (): void {
  this.passwordResetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000;
  this.passwordResetRequestsAttempts++;
  this.passwordLastResetRequestAttemptDate = new Date();
};

// method to generate deactivation token and assign it to the user.
userSchema.methods.createDeactivationAccountToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.deactivationAccountToken = token;
  this.deactivationAccountTokenExpiredAt = Date.now() + 3600000; // 1 hour
  this.lastDeactivationRequestAt = new Date();
  this.deactivationRequestCount++;
};

// method to generate reactivation token and assign it to the user.
userSchema.methods.createReactivationAccountToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.reactivationAccountToken = token;
  this.reactivationAccountTokenExpiredAt = Date.now() + 3600000; // 1 hour
  this.lastReactivationRequestAt = new Date();
  this.reactivationRequestCount++;
};

// method to generate delete account request token and assign it to the user.
userSchema.methods.createDeleteAccountRequestToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.deleteAccountRequestToken = token;
  this.deleteAccountRequestTokenExpiredAt = Date.now() + 1 * 60 * 60 * 1000;
  this.lastDeleteAccountRequestAt = new Date();
  this.deleteAccountRequestCount++;
};

// method to generate change email request token and assign it to the user.
userSchema.methods.createChangeEmailRequestToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.changeEmailRequestToken = token;
  this.changeEmailVerificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
  this.lastChangeEmailRequestAt = new Date();
  this.changeEmailRequestCount++;
};

// method to generate temp email verification token and assign it to the user.
userSchema.methods.createTempChangedEmailVerificationToken = function (): void {
  const token: string = crypto.randomBytes(32).toString("hex");
  this.tempChangeEmailVerificationToken = token;
  this.tempChangedEmailVerificationTokenSentAt = new Date();
  this.tempChangedEmailVerificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
  this.tempChangedEmailVerificationTokenCount++;
};

// create model from schema
const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export default UserModel;
