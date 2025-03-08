import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IBlogsLogger } from "../interfaces/index";

export class BlogsLogger implements IBlogsLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("blogs");
  }
  // log fail blogs post creation
  public logFailedBlogPostCreation = (userId: ObjectId, errMessage: any) => {
    this.logger.error({
      message: "Failed to create a blog post",
      errMessage: errMessage
        ? errMessage
        : "An error occurred while creating a blog post",
      userId,
      timestamp: new Date().toISOString(),
      service: "BlogOwnerCRUDService",
    });
  };

  // Log failure blog deletion request-(blog owner delete blog post)
  public logFailedBlogDeletion = (
    userId: ObjectId,
    errMessage: any,
    blogId: ObjectId,
    ownerOperation: boolean,
    adminOperation: boolean
  ) => {
    this.logger.error({
      message: "Failed to delete a blog post",
      errMessage: errMessage
        ? errMessage
        : "An error occurred while deleting a blog post",
      userId,
      blogId,
      ownerOperation,
      adminOperation,
      timestamp: new Date().toISOString(),
      service: "BlogOwnerCRUDService",
    });
  };
}
