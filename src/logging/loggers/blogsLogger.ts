import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { IUser } from "@features/users";

// Configure Winston logger
const blogsLogger: Logger = createLogger("blogs");

// log fail blogs post creation
export const logFailedBlogPostCreation = (
  userId: ObjectId,
  errMessage: any
) => {
  blogsLogger.error({
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
export const logFailedBlogDeletion = (
  userId: ObjectId,
  errMessage: any,
  blogId: ObjectId,
  ownerOperation: boolean,
  adminOperation: boolean
) => {
  blogsLogger.error({
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
