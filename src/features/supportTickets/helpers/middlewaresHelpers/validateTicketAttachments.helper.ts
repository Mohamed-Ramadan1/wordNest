import { IUser } from "@features/users";
import { AppError } from "@utils/appError";
import { Attachment } from "../../interfaces/supportTicket.interface";
import { removeLocalFile } from "@utils/index";
export const validateSupportTicketAttachments = (
  file: Express.Multer.File,
  user: IUser
): Attachment => {
  if (
    (file && file.mimetype.split("/")[0] !== "image") ||
    (file && file.size > 3000000)
  ) {
    // remove the file from the local storage
    removeLocalFile(file.path, "support ticket attachment");

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
