import { Job } from "bull";

// cloudinary imports
import cloudinary from "cloudinary";

// logs imports
import { CloudinaryLogger } from "@logging/index";

const cloudinaryLogger = new CloudinaryLogger();
export const deleteImageProcessor = async (job: Job) => {
  try {
    const destroyResponse = await cloudinary.v2.uploader.destroy(
      job.data.publicId
    );

    if (destroyResponse.result !== "ok") {
      cloudinaryLogger.logFailedImageDelete(
        "image deleting fail ",
        job.data.publicId,
        job.data.userId
      );
    }
  } catch (err: any) {
    cloudinaryLogger.logFailedImageDelete(
      err.message,
      job.data.imagePublicId,
      job.data.userId
    );
  }
};
