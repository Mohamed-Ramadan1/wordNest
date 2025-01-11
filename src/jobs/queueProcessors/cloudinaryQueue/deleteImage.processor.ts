import { Job } from "bull";

// cloudinary imports
import cloudinary from "cloudinary";

// logs imports
import { logFailedImageDelete } from "@logging/index";

export const deleteImageProcessor = async (job: Job) => {
  try {
    const destroyResponse = await cloudinary.v2.uploader.destroy(
      job.data.profilePictureId
    );

    if (destroyResponse.result !== "ok") {
      logFailedImageDelete(
        "image deleting fail ",
        job.data.profilePictureId,
        job.data.userId
      );
    }
  } catch (err: any) {
    logFailedImageDelete(
      err.message,
      job.data.profilePictureId,
      job.data.userId
    );
  }
};
