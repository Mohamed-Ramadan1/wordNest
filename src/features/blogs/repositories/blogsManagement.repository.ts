// mongoose imports
import { ObjectId } from "mongoose";

// interfaces imports
import {
  IBlogManagementRepository,
  IBlog,
  DeletionStatus,
  ReviewContentStatus,
} from "../interfaces/index";

export class BlogManagementRepository implements IBlogManagementRepository {
  public async markBlogPostToDelete(blogPost: IBlog): Promise<void> {
    try {
      blogPost.toBeDeleted = true;
      blogPost.deletionStatus = DeletionStatus.PENDING;
      await blogPost.save();
    } catch (err: any) {
      throw new Error(
        `Error with marking the blog post as deleted: ${err.message}`
      );
    }
  }

  public async markBlogPostAsUnpublished(
    blogPost: IBlog,
    adminId: ObjectId
  ): Promise<void> {
    try {
      blogPost.isPublished = false;
      blogPost.underReview = true;
      blogPost.addToUnderReviewAt = new Date();
      blogPost.reviewStatus = ReviewContentStatus.PENDING;
      blogPost.addToUnderReviewBy = adminId;
      await blogPost.save();
    } catch (err: any) {
      throw new Error(
        `Error with marking the blog post as unpublished: ${err.message}`
      );
    }
  }

  public async markBlogPostAsPublished(
    blogPost: IBlog,
    adminId: ObjectId
  ): Promise<void> {
    try {
      blogPost.isPublished = true;
      blogPost.underReview = false;
      blogPost.addToUnderReviewAt = undefined;
      blogPost.reviewStatus = ReviewContentStatus.APPROVED;
      blogPost.reviewedAt = new Date();
      blogPost.reviewedBy = adminId;
      await blogPost.save();
    } catch (err: any) {
      throw new Error(
        `Error with marking the blog post as published: ${err.message}`
      );
    }
  }
}
