import { AppError } from "@utils/appError";
import { catchAsync } from "@utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { IFieldsToBeUpdates } from "@features/users/interfaces/fieldsToBeUpdate.interface";
import { removeLocalFile } from "@utils/index";

export class ProfileMiddleware {
  static validateUpdateUserProfilePicture = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file || !req.file.mimetype.startsWith("image/")) {
        return next(new AppError("Please provide a image", 400));
      }

      if (req.file.size > 1024 * 1024 * 2) {
        // remove the local file.
        removeLocalFile(req.file.path, "profile picture");
        return next(new AppError("Image size should not exceed 2MB", 400));
      }

      next();
    }
  );

  static validateUpdateUserProfileInformation = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName, bio, password, confirmPassword } = req.body;

      // Check for at least one of the required attributes
      if (!firstName && !lastName && !bio) {
        return next(
          new AppError(
            "Please provide at least one of the following attributes to update: firstName, lastName, or bio.",
            400
          )
        );
      }
      const fieldsToUpdate: IFieldsToBeUpdates = {};

      // Updated validation logic for firstName and lastName
      if (firstName !== undefined) {
        const trimmedFirstName = firstName.trim();
        if (
          trimmedFirstName === "" ||
          trimmedFirstName.length < 3 ||
          trimmedFirstName.length > 20
        ) {
          return next(
            new AppError(
              "First name must be a non-empty string with a minimum of 3 characters and a maximum of 20 characters.",
              400
            )
          );
        }
        fieldsToUpdate.firstName = firstName;
      }

      if (lastName !== undefined) {
        const trimmedLastName = lastName.trim();
        if (
          trimmedLastName === "" ||
          trimmedLastName.length < 3 ||
          trimmedLastName.length > 20
        ) {
          return next(
            new AppError(
              "Last name must be a non-empty string with a minimum of 3 characters and a maximum of 20 characters.",
              400
            )
          );
        }
        fieldsToUpdate.lastName = lastName;
      }

      // Validate bio
      if (bio !== undefined) {
        const trimmedBio = bio.trim();
        if (trimmedBio.length < 0 || trimmedBio.length > 500) {
          return next(
            new AppError(
              "Bio must be a string with a maximum of 500 characters.",
              400
            )
          );
        }
        fieldsToUpdate.bio = bio;
      }

      // Reject any password-related updates
      if (password || confirmPassword) {
        return next(
          new AppError("Password updates are not allowed on this route.", 400)
        );
      }
      // set request parameter with info to be updated
      req.profileInformationToUpdate = fieldsToUpdate;
      // Proceed to the next middleware if all validations pass
      next();
    }
  );
}
