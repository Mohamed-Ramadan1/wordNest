import cloudinary from "cloudinary";

/**
 * Interface for handling file uploads to Cloudinary.
 * Provides methods for uploading single and multiple files with specific configurations.
 */
export interface ICloudinaryUploader {
  /**
   * Uploads a single file to Cloudinary.
   *
   * @param {string} filePath - The local file path of the file to upload.
   * @param {string} resourceName - The name or identifier for the resource (e.g., "image", "video").
   * @returns {Promise<cloudinary.UploadApiResponse>} A promise that resolves to the Cloudinary upload response.
   * @throws {Error} If the upload fails due to network issues or invalid parameters.
   */
  uploadSingleFile(
    filePath: string,
    resourceName: string
  ): Promise<cloudinary.UploadApiResponse>;

  /**
   * Uploads multiple images to Cloudinary and returns their URLs and public IDs.
   *
   * @param {{ path: string }[]} filePaths - An array of objects containing file paths to upload.
   * @param {string} resourceName - The name or identifier for the resource (e.g., "image").
   * @param {string} [folder] - Optional folder name in Cloudinary where the images will be stored.
   * @returns {Promise<{ url: string; publicId: string }[]>} A promise that resolves to an array of objects containing the uploaded image URLs and public IDs.
   * @throws {Error} If any upload fails due to invalid file paths or Cloudinary configuration issues.
   */
  uploadMultipleImages(
    filePaths: { path: string }[],
    resourceName: string,
    folder?: string
  ): Promise<{ url: string; publicId: string }[]>;
}
