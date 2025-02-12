import slugify from "slugify";
import { BlogData } from "../interfaces/blogOwnerRequest.interface";
import {
  BlogCategory,
  IBlog,
  IUploadedImage,
  ScheduleStatus,
  SEOMetadata,
  DeletionStatus,
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
    slug: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date },
    drafted: { type: Boolean, default: true },
    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date },
    isScheduled: { type: Boolean, default: false },
    scheduledFor: { type: Date },
    scheduleStatus: {
      type: String,
      enum: Object.values(ScheduleStatus),
    },
    seo: { type: seoMetadataSchema },
    isPrivate: { type: Boolean, default: false },
    uploadedImages: [{ type: uploadedImageSchema }],
    tags: [{ type: String }],
    categories: [
      {
        type: String,
        enum: Object.values(BlogCategory),
        required: [true, "Please provide a category"],
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
    toBeDeleted: {
      type: Boolean,
      default: false,
    },
    requestDeleteAt: {
      type: Date,
    },
    deletionStatus: {
      type: String,
      enum: Object.values(DeletionStatus),
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
blogSchema.index({ title: "text", content: "text" });
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ author: 1 });
blogSchema.index({ publishedAt: -1 });

blogSchema.virtual("estimatedReadingTime").get(function () {
  return Math.ceil(this.content.split(" ").length / 200); // Assuming 200 words/min reading speed
});

blogSchema.methods.createBlogSlug = function () {
  const baseSlug = slugify(this.title, { lower: true, strict: true });
  const randomString = Math.random().toString(36).substring(2, 8); // Random 6-character string
  this.slug = `${baseSlug}-${randomString}`;
};

blogSchema.methods.generateSEOMetadata = function (blogData: BlogData): void {
  this.seo = {
    metaTitle:
      blogData.title.length > 60
        ? `${blogData.title.slice(0, 57)}...`
        : blogData.title,

    metaDescription:
      blogData.content.length > 160
        ? `${blogData.content.slice(0, 157)}...`
        : blogData.content,

    canonicalUrl: `https://yourwebsite.com/blog/${slugify(blogData.title, { lower: true, strict: true })}`,

    keywords: [...blogData.tags, blogData.categories.toLowerCase()],

    ogImage: blogData.uploadedImages?.length
      ? blogData.uploadedImages[0].url
      : undefined,
  };
};

const BlogModel = model<IBlog>("Blog", blogSchema);
export default BlogModel;
