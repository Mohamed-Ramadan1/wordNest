import { Document, ObjectId } from "mongoose";

export enum Roles {
  User = "user",
  Admin = "admin",
  BlogAdmin = "blog-admin",
}

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
  roles: Roles[];
  createdAt: Date;
  updatedAt: Date;

  createEmailVerificationToken(): string;
  comparePassword(candidatePassword: string, userPassword: string): boolean;
}
