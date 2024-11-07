import { Document, ObjectId } from "mongoose";

export enum Roles {
  User = "user",
  Admin = "admin",
  BlogAdmin = "blog-admin",
}

export interface IUser extends Document {
  _id: ObjectId;
  firstName: String;
  lastName: string;

  email: string;
  emailVerificationToken: string;
  emailVerified: boolean;
  emailResetToken: string;
  emailResetTokenExpiredAt: Date;
  isActive: boolean;

  following: number;
  followingIds: ObjectId[];

  followers: number;
  followerIds: ObjectId[];

  bio: string;
  profilePicture: string;

  password: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetTokenExpiredAt: Date;

  notificationsEnabled: boolean;

  role: Roles[];
  createdAt: Date;
  updatedAt: Date;
}
