import { IUser } from "@features/users";
import { AppError } from "@shared/utils/appError";
import { Attachment } from "../../interfaces/supportTicket.interface";
import { removeLocalFile } from "@shared/index";

export const validateSupportTicketAttachments = (
  file: Express.Multer.File,
  user: IUser
): Attachment => {
  if (
    !file || // Ensure file is not null or undefined
    file.mimetype?.split("/")[0] !== "image" ||
    file.size > 3000000
  ) {
    // Remove the file from local storage if it exists
    if (file?.path) removeLocalFile(file.path, "support ticket attachment");

    // throw an error
    throw new AppError("File must be an image and not more than 3MB", 400);
  }
  const attachments: Attachment = {
    imageLink: file.path,
    uploadedAt: new Date(),
    imagePublicId: `support-ticket-${user._id}-${Date.now()}`,
  };
  return attachments;
};
