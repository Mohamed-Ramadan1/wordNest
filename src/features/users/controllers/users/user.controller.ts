// system imports
import { Request, Response } from "express";

// models imports
import UserModel from "../../models/user.model";
// interfaces imports
import { IUser } from "@features/users/interfaces/user.interface";

// services imports
import UserService from "../../services/users/user.service";

// utils imports
import { catchAsync, sendResponse } from "@utils/index";

// shared interface imports
import { ApiResponse } from "@shared/index";

export default class UserController {
  /**
   * Updates the user's profile picture.
   * This involves uploading a new picture and saving the reference to the user's profile.
   */
  public updateProfilePicture = catchAsync(
    async (req: Request, res: Response) => {
      const updatedUser = await UserService.updateProfilePicture(
        req.user as IUser,
        req.file
      );
      const response: ApiResponse<IUser> = {
        status: "success",
        message: "Profile picture updated successfully",
        data: { updatedUser },
      };

      sendResponse(200, res, response);
    }
  );

  /**
   * Updates the user's profile information such as name, bio, or contact details.
   * This function allows partial updates to the user's profile.
   */
  public updateProfileInformation = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Allows the user to change their account password.
   * Validates the old password before updating to a new one.
   */
  public changeAccountPassword = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Handles the user's request to delete their account.
   * This initiates the deletion process and may involve additional verification steps.
   */
  public requestAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Confirms the account deletion process.
   * Deletes the user's account after verification or additional security checks.
   */
  public confirmAccountDeletion = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Retrieves the user's profile information.
   * Returns details such as name, email, profile picture, and other user-specific data.
   */
  public getProfile = catchAsync(async (req: Request, res: Response) => {});

  /**
   * Activates the user's account.
   * This may be used to enable the account after it has been deactivated or suspended.
   */
  public activateAccount = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Deactivates the user's account.
   * Temporarily disables the account, preventing access and activity.
   */
  public deactivateAccount = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Enables notifications for the user's account.
   * This includes email, SMS, or other notification preferences.
   */
  public enableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Disables notifications for the user's account.
   * Allows the user to opt out of receiving account-related notifications.
   */
  public disableAccountNotifications = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Handles a request to change the user's email address.
   * Initiates the process, including generating a verification token.
   */
  public requestAccountEmailChange = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Confirms the user's email address change.
   * Verifies the provided token and updates the email address in the user's account.
   */
  public confirmAccountEmailChange = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Links a social account (e.g., Google, Facebook) to the user's account.
   * Stores the social account's information for profile adding .
   */
  public addSocialAccount = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Removes a linked social account from the user's account.
   */
  public removeSocialAccount = catchAsync(
    async (req: Request, res: Response) => {}
  );

  /**
   * Exports the user's account data.
   * Prepares and provides a downloadable file containing all relevant user data.
   */
  public exportAccountData = catchAsync(
    async (req: Request, res: Response) => {}
  );
}
