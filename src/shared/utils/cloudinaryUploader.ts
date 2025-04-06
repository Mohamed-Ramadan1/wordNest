// packages imports
import { inject, injectable } from "inversify";
import { TYPES } from "@shared/index";
import cloudinary from "cloudinary";
import { AppError } from "./appError";
import { removeLocalFile } from "./deleteLocalFiles";
import { ICloudinaryUploader } from "../interfaces/index";
import { ICloudinaryLogger } from "@logging/interfaces";

@injectable()
export class CloudinaryUploader implements ICloudinaryUploader {
  constructor(
    @inject(TYPES.CloudinaryLogger)
    private readonly cloudinaryLogger: ICloudinaryLogger
  ) {}

  /**
   * Upload a single file to Cloudinary
   * @param filePath Path to the file to upload
   * @param resourceName Name of the resource for logging purposes
   * @returns Cloudinary upload response
   */
  public async uploadSingleFile(
    filePath: string,
    resourceName: string
  ): Promise<cloudinary.UploadApiResponse> {
    try {
      const uploadedResource: cloudinary.UploadApiResponse | null =
        await cloudinary.v2.uploader.upload(filePath);

      if (!uploadedResource.secure_url) {
        this.cloudinaryLogger.logFailedResourceUpload(
          "Failed to upload resource to Cloudinary: No secure URL returned",
          resourceName,
          filePath
        );
        throw new AppError("Failed to upload resource to Cloudinary", 500);
      }
      console.log(filePath, resourceName);
      // remove the local file after uploading to cloudinary
      removeLocalFile(filePath, resourceName);

      return uploadedResource;
    } catch (err: any) {
      this.cloudinaryLogger.logFailedResourceUpload(
        `Failed to upload resource to Cloudinary: ${err.message}. File: ${filePath}, Resource Type: ${resourceName}`,
        resourceName,
        filePath
      );

      throw new AppError("Failed to upload resource to Cloudinary", 500);
    }
  }

  /**
   * Upload multiple images to Cloudinary
   * @param filePaths Array of file path objects to upload
   * @param resourceName Name of the resource for logging purposes
   * @param folder Optional folder name in Cloudinary (defaults to "uploads")
   * @returns Array of objects containing URL and public ID for each uploaded image
   */
  public async uploadMultipleImages(
    filePaths: { path: string }[],
    resourceName: string,
    folder = "uploads"
  ): Promise<{ url: string; publicId: string }[]> {
    try {
      const uploadPromises = filePaths.map(async (filePath) => {
        try {
          const uploadedResource = await cloudinary.v2.uploader.upload(
            filePath.path,
            {
              folder,
            }
          );

          if (!uploadedResource.secure_url) {
            this.cloudinaryLogger.logFailedResourceUpload(
              "Failed to upload resource to Cloudinary: No secure URL returned",
              resourceName,
              filePath.path
            );
            throw new AppError("Failed to upload resource to Cloudinary", 500);
          }

          // Remove local file after successful upload
          removeLocalFile(filePath.path, resourceName);

          return {
            url: uploadedResource.secure_url,
            publicId: uploadedResource.public_id,
          };
        } catch (err: any) {
          this.cloudinaryLogger.logFailedResourceUpload(
            `Failed to upload resource to Cloudinary: ${err.message}. File: ${filePath.path}, Resource Type: ${resourceName}`,
            resourceName,
            filePath.path
          );
          throw new AppError(
            `Failed to upload file ${filePath.path} to Cloudinary`,
            500
          );
        }
      });

      return await Promise.all(uploadPromises);
    } catch (error: any) {
      console.log(error.message);
      throw new AppError(
        "Error occurred while uploading images to Cloudinary",
        500
      );
    }
  }
}
