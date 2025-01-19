import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";

// Configure Winston logger
const cloudinaryLogger: Logger = createLogger("cloudinary");

// Log fail attempts to upload images to cloudinary
export function logFailedImageUpload(errMessage: string, userId: ObjectId) {
  cloudinaryLogger.error("Failed to upload image to cloudinary", {
    event: "image_upload_failed",
    userID: userId,
    error: errMessage,
    timestamp: new Date().toISOString(),
  });
}

// Log fail attempts to delete images from cloudinary (old images )
export function logFailedImageDelete(
  errMessage: string,
  imageId: string,
  userId: ObjectId
) {
  cloudinaryLogger.error("Failed to delete image from cloudinary", {
    event: "image_delete_failed",
    imageId: imageId,
    userID: userId,
    error: errMessage,
    timestamp: new Date().toISOString(),
  });
}

// log fail to upload resource to cloudinary
export function logFailedResourceUpload(
  errMessage: string,
  resourceType: string,
  filePath?: string
) {
  cloudinaryLogger.error("Failed to upload resource to cloudinary", {
    event: "resource_upload_failed",
    error: errMessage,
    resourceType: resourceType,
    filePath: filePath,
    timestamp: new Date().toISOString(),
  });
}
