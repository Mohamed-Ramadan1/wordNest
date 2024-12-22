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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

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

    following: { type: Number, default: 0 },
    followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    followers: { type: Number, default: 0 },
    followerIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    bio: { type: String, default: "" },
    profilePicture: { type: String, default: defaultProfilePicture },

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

// hash the user password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
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

// create model from schema

const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export default UserModel;
