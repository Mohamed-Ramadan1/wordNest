import { Document, ObjectId } from "mongoose";
import { IUser } from "@features/users";
import { BlogData } from "../interfaces/blogOwnerRequest.interface";
export interface IUploadedImage {
  url: string;
  publicId: string;
  alt?: string;
}

export enum ScheduleStatus {
  PENDING = "pending",
  PUBLISHED = "published",
  FAILED = "failed",
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  keywords: string[];
  ogImage: string;
}

export enum BlogCategory {
  TECHNOLOGY = "technology",
  HEALTH = "health",
  BUSINESS = "business",
  POLITICS = "politics",
  SPORTS = "sports",
  ENTERTAINMENT = "entertainment",
  FASHION = "fashion",
  ARTS = "arts",
  SCIENCE = "science",
  EDUCATION = "education",
  RELIGION = "religion",
  FOOD = "food",
  TRAVEL = "travel",
  OTHER = "other",
}
export enum ReviewContentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum DeletionStatus {
  PENDING = "pending",
  INPROGRESS = "inprogress",
  FAILED = "failed",
}

export interface IBlog extends Document {
  _id: ObjectId;
  title: string;
  content: string;
  excerpt?: string;
  uploadedImages: IUploadedImage[];
  author: IUser | ObjectId;
  tags: string[];
  categories: BlogCategory;
  isPublished: boolean;
  publishedAt: Date;
  drafted: boolean;
  isEdited?: boolean;
  editedAt?: Date;
  isScheduled?: boolean;
  scheduledFor?: Date;
  scheduleStatus?: ScheduleStatus;
  slug: string;
  seo: SEOMetadata;
  isPrivate: boolean;
  isArchived: boolean;
  archivedAt: Date;
  interActionsCount: number;
  commentsCount: number;
  allowComments: boolean;
  sharesCount: number;
  viewsCount: number;
  toBeDeleted: boolean;
  requestDeleteAt: Date;
  deletionStatus: DeletionStatus;
  underReview: boolean;
  addToUnderReviewAt: Date;
  reviewStatus: ReviewContentStatus;
  reviewedBy: IUser | ObjectId;
  reviewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  createBlogSlug(): void;
  generateSEOMetadata(blogData: BlogData): void;
}
