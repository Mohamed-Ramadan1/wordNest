    import { Document, ObjectId } from "mongoose";
    import { IUser } from "@features/users";
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
      metaTitle?: string;
      metaDescription?: string;
      canonicalUrl?: string;
      keywords?: string[];
      ogImage?: string;
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

    export interface IBlog extends Document {
      _id: ObjectId;
      title: string;
      content: string;
      excerpt?: string;
      author: ObjectId | IUser;
      slug: string;
      readingTime: string;
      isPublished: boolean;
      publishedAt: Date;
      drafted: boolean;
      isEdited?: boolean;
      editedAt?: Date;
      isScheduled?: boolean;
      scheduledFor?: Date;
      scheduleStatus?: ScheduleStatus;
      seo?: SEOMetadata;
      isPrivate: boolean;
      uploadedImages: IUploadedImage[];
      tags: string[];
      categories: string[];
      interActionsCount: number;
      commentsCount: number;
      allowComments: boolean;
      sharesCount: number;
      viewsCount: number;
      createdAt: Date;
      updatedAt: Date;
    }
