import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IBlogsQueueLogger } from "../interfaces/index";

export class BlogsQueueLogger implements IBlogsQueueLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("blogsQueue");
  }
  // log failed blog post deletion events
  public logFailedBlogDeletion = (
    errorMessage: string,
    jobAttempt: number,
    blogId: ObjectId | undefined = undefined
  ) => {
    this.logger.error({
      message: "Failed to delete a blog post",
      blogId: blogId ? blogId : "unknown blog id",
      errorMessage,
      jobAttempt,
      timestamp: new Date().toISOString(),
      errorLocation: "BlogQueueProcessor",
    });
  };

  // log failed corn job for collect all failed jobs and read them to the delete queue again
  public logFailedCollectFailedDeletionBlogs = (errorMessage: string) => {
    this.logger.error({
      message:
        "Failed to collectFailedDeletionBlogsProcessor and register them again to the delete queue",
      errorMessage,

      timestamp: new Date().toISOString(),
      errorLocation: "collectFailedDeletionBlogsProcessor",
    });
  };

  // log failed publish scheduled blog post events
  public logFailedPublishScheduledBlog = (
    errorMessage: string,
    jobAttempt: number,
    blogId: ObjectId | undefined = undefined
  ) => {
    this.logger.error({
      message: "Failed to publish a scheduled blog post",
      blogId: blogId ? blogId : "unknown blog id",
      errorMessage,
      jobAttempt,
      timestamp: new Date().toISOString(),
      errorLocation: "publishScheduledBlogProcessor",
    });
  };

  //log failed send deletion email to the user
  public logFailedSendDeleteBlogEmail = (
    errorMessage: string,
    jobAttempt: number,
    userEmail: string,
    blogId: ObjectId | undefined = undefined
  ) => {
    this.logger.error({
      message: "Failed to send delete blog email",
      blogId: blogId ? blogId : "unknown blog id",
      userEmail,
      errorMessage,
      jobAttempt,
      timestamp: new Date().toISOString(),
      errorLocation: "sendDeleteBlogEmailProcessor",
    });
  };

  // log failed send unpublished blog email to the user
  public logFailedSendUnPublishedBlogEmail = (
    errorMessage: string,
    jobAttempt: number,
    userEmail: string,
    blogId: ObjectId | undefined = undefined
  ) => {
    this.logger.error({
      message: "Failed to send unpublished blog email",
      blogId: blogId ? blogId : "unknown blog id",
      userEmail,
      errorMessage,
      jobAttempt,
      timestamp: new Date().toISOString(),
      errorLocation: "sendUnPublishedBlogEmailProcessor",
    });
  };

  // log failed send republished blog email to the user
  public logFailedSendRepublishedBlogEmail = (
    errorMessage: string,
    jobAttempt: number,
    userEmail: string,
    blogId: ObjectId | undefined = undefined
  ) => {
    this.logger.error({
      message: "Failed to send republished blog email",
      blogId: blogId ? blogId : "unknown blog id",
      userEmail,
      errorMessage,
      jobAttempt,
      timestamp: new Date().toISOString(),
      errorLocation: "sendRepublishedBlogEmailProcessor",
    });
  };

  // log blogPost deletion action (the data about the deletion process who deleted the blog post and when)
  public logBlogPostDeletion = (
    blogId: ObjectId,
    userEmail: string,
    deletionDate: Date
  ) => {
    this.logger.info({
      message: "Blog deletion action information",
      blogId,
      deletedBy: userEmail,
      deletionDate,
      timestamp: new Date().toISOString(),
    });
  };

  // log blog post un published action
  public logBlogPostUnPublishedAction = (
    blogId: ObjectId,
    unPublishedDate: Date,
    unPublishedByAdminEmail: string
  ) => {
    this.logger.info({
      message: "Blog unpublished action information",
      blogId,
      unpublishedBy: unPublishedByAdminEmail,
      unPublishedDate,
      timestamp: new Date().toISOString(),
    });
  };

  // log blog post republished action
  public logBlogPostRepublishedAction = (
    blogId: ObjectId,
    republishedDate: Date,
    republishedByAdminEmail: string
  ) => {
    this.logger.info({
      message: "Blog republished action information",
      blogId,
      republishedBy: republishedByAdminEmail,
      republishedDate,
      timestamp: new Date().toISOString(),
    });
  };
}
