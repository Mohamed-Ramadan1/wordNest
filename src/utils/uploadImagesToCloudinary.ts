import cloudinary from "cloudinary";
import { AppError } from "./appError";
import { logFailedResourceUpload } from "@logging/index";
import { removeLocalFile } from "./deleteLocalFiles";

export async function uploadImagesToCloudinary(
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
          logFailedResourceUpload(
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
        logFailedResourceUpload(
          `Failed to upload resource to Cloudinary: ${err.message}. File: ${filePath}, Resource Type: ${resourceName}`,
          resourceName,
          filePath.path
        );
        throw new AppError(
          `Failed to upload file ${filePath} to Cloudinary`,
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
