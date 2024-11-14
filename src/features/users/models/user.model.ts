import { Schema, Model, model } from "mongoose";
import {
  IUser,
  Roles,
  defaultProfilePicture,
} from "../interfaces/user.interface";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";

const userSchema: Schema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: (email: string) => isEmail(email),
        message: "Invalid email format",
      },
    },
    emailVerificationToken: { type: String, default: null },
    emailVerified: { type: Boolean, default: false },
    emailResetToken: { type: String, default: null },
    emailResetTokenExpiredAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },

    following: { type: Number, default: 0 },
    followingIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    followers: { type: Number, default: 0 },
    followerIds: [{ type: Schema.Types.ObjectId, ref: "User" }],

    bio: { type: String, default: "" },
    profilePicture: { type: String, default: defaultProfilePicture },

    password: { type: String, required: true },
    passwordChangedAt: { type: Date, default: null },
    passwordResetToken: { type: String, default: null },

    role: {
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

const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export default UserModel;
