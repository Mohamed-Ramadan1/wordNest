import cloudinary from "cloudinary";
import { AppError } from "./appError";
import { CloudinaryLogger } from "@logging/index";
import { removeLocalFile } from "./deleteLocalFiles";

// single file upload to cloudinary function
const cloudinaryLogger = new CloudinaryLogger();
export async function uploadToCloudinary(
  filePath: string,
  resourceName: string
): Promise<cloudinary.UploadApiResponse> {
  try {
    const uploadedResource: cloudinary.UploadApiResponse | null =
      await cloudinary.v2.uploader.upload(filePath);

    if (!uploadedResource.secure_url) {
      cloudinaryLogger.logFailedResourceUpload(
        "Failed to upload resource to Cloudinary: No secure URL returned",
        resourceName,
        filePath
      );
      throw new AppError("Failed to upload resource to Cloudinary", 500);
    }
    // remove the local file after uploading to cloudinary
    removeLocalFile(filePath, resourceName);

    return uploadedResource;
  } catch (err: any) {
    cloudinaryLogger.logFailedResourceUpload(
      `Failed to upload resource to Cloudinary: ${err.message}. File: ${filePath}, Resource Type: ${resourceName}`,
      resourceName,
      filePath
    );

    throw new AppError("Failed to upload resource to Cloudinary", 500);
  }
}
