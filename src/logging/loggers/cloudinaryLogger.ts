import { ObjectId } from "mongoose";
import { createLogger } from "@logging/utils/loggerFactory";
import { Logger } from "winston";
import { ICloudinaryLogger } from "@logging/interfaces/index";

export class CloudinaryLogger implements ICloudinaryLogger {
  private logger: Logger;
  constructor() {
    this.logger = createLogger("cloudinary");
  }

  // Log fail attempts to upload images to cloudinary
  public logFailedImageUpload(errMessage: string, userId: ObjectId) {
    this.logger.error("Failed to upload image to cloudinary", {
      event: "image_upload_failed",
      userID: userId,
      error: errMessage,
      timestamp: new Date().toISOString(),
    });
  }

  // Log fail attempts to delete images from cloudinary (old images )
  public logFailedImageDelete(
    errMessage: string,
    imageId: string,
    userId: ObjectId
  ) {
    this.logger.error("Failed to delete image from cloudinary", {
      event: "image_delete_failed",
      imageId: imageId,
      userID: userId,
      error: errMessage,
      timestamp: new Date().toISOString(),
    });
  }

  // log fail to upload resource to cloudinary
  public logFailedResourceUpload(
    errMessage: string,
    resourceType: string,
    filePath?: string
  ) {
    this.logger.error("Failed to upload resource to cloudinary", {
      event: "resource_upload_failed",
      error: errMessage,
      resourceType: resourceType,
      filePath: filePath,
      timestamp: new Date().toISOString(),
    });
  }
}
