import {
  BlogCategory,
  IBlog,
  IUploadedImage,
  ScheduleStatus,
  SEOMetadata,
} from "../interfaces/blog.interface";

import { model, Schema } from "mongoose";
const uploadedImageSchema = new Schema<IUploadedImage>({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  alt: { type: String },
});

const seoMetadataSchema = new Schema<SEOMetadata>({
  metaTitle: { type: String },
  metaDescription: { type: String },
  canonicalUrl: { type: String },
  keywords: [{ type: String }],
  ogImage: { type: String },
});

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slug: { type: String, required: true, unique: true },
    readingTime: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    drafted: { type: Boolean, default: true },
    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date },
    isScheduled: { type: Boolean, default: false },
    scheduledFor: { type: Date },
    scheduleStatus: {
      type: String,
      enum: Object.values(ScheduleStatus),
      default: ScheduleStatus.PENDING,
    },
    seo: { type: seoMetadataSchema },
    isPrivate: { type: Boolean, default: false },
    uploadedImages: [{ type: uploadedImageSchema }],
    tags: [{ type: String }],
    categories: [
      {
        type: String,
        enum: Object.values(BlogCategory),
        default: [],
      },
    ],
    interActionsCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    allowComments: {
      type: Boolean,
      default: true,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const BlogModel = model<IBlog>("Blog", blogSchema);
export default BlogModel;
