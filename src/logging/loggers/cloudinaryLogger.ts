import winston from "winston";
import { jsonFormatter } from "@logging/formatters/jsonFormatter";
import { ObjectId } from "mongoose";

const logger = winston.createLogger({
  level: "info",
  format: jsonFormatter,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/cloudinary-logs.log" }),
  ],
});

// Log fail attempts to upload images to cloudinary
export function logFailedImageUpload(errMessage: string, userId: ObjectId) {
  logger.error("Failed to upload image to cloudinary", {
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
  logger.error("Failed to delete image from cloudinary", {
    event: "image_delete_failed",
    imageId: imageId,
    userID: userId,
    error: errMessage,
    timestamp: new Date().toISOString(),
  });
}
