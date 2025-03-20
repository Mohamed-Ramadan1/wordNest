import { ObjectId } from "mongoose";

/**
 * Interface for logging cloudinary-related events in the system.
 */
export interface ICloudinaryLogger {
  /**
   * Log a failed attempt to upload an image to Cloudinary.
   * @param errMessage - The error message explaining why the image upload failed.
   * @param userId - The ID of the user who attempted the image upload.
   */
  logFailedImageUpload(errMessage: string, userId: ObjectId): void;

  /**
   * Log a failed attempt to delete an image from Cloudinary.
   * @param errMessage - The error message explaining why the image deletion failed.
   * @param imageId - The ID of the image that failed to be deleted.
   * @param userId - The ID of the user who attempted the image deletion.
   */
  logFailedImageDelete(
    errMessage: string,
    imageId: string,
    userId: ObjectId
  ): void;

  /**
   * Log a failed attempt to upload a resource to Cloudinary.
   * @param errMessage - The error message explaining why the resource upload failed.
   * @param resourceType - The type of resource that was attempted to upload (e.g., image, video).
   * @param filePath - Optional file path of the resource being uploaded.
   */
  logFailedResourceUpload(
    errMessage: string,
    resourceType: string,
    filePath?: string
  ): void;
}
