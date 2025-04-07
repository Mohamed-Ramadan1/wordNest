// packages imports
import { inject, injectable } from "inversify";

// utils imports
import { IErrorUtils, TYPES } from "@shared/index";

// models imports
import { IUser } from "@features/users/interfaces/user.interface";
import {
  IAccountPasswordManagementService,
  IUserSelfRepository,
} from "../../interfaces/index";

@injectable()
export class AccountPasswordManagementService
  implements IAccountPasswordManagementService
{
  constructor(
    @inject(TYPES.UserSelfRepository)
    private readonly userSelfRepository: IUserSelfRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  public async changePassword(user: IUser, newPassword: string): Promise<void> {
    try {
      this.userSelfRepository.updateUserPassword(user, newPassword);
    } catch (err: any) {
      this.errorUtils.handleServiceError(err);
    }
  }
}
