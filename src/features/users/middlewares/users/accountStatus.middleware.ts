// Express imports
import { NextFunction, Request, Response } from "express";

//packages imports
import { inject, injectable } from "inversify";

// shard imports
import { AppError, catchAsync, TYPES } from "@shared/index";

// interfaces imports
import {
  IUser,
  IAccountStatusMiddleware,
  IUserAuthRepository,
  AccountStatusRequestParams,
} from "../../interfaces/index";

const MAX_DEACTIVATION_REQUESTS: number = 4;
const COOLDOWN_PERIOD: number = 48 * 60 * 60 * 1000;
// const COOLDOWN_PERIOD :number= 1 * 60 * 1000; // 1 minute in milliseconds

@injectable()
export class AccountStatusMiddleware implements IAccountStatusMiddleware {
  constructor(
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository
  ) {}
  // validate deactivate account request
  public validateDeactivateAccountRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user.isActive) {
        throw new AppError("Account is already deactivated", 400);
      }

      const hasExceededRequests =
        user.deactivationRequestCount >= MAX_DEACTIVATION_REQUESTS &&
        user.lastDeactivationRequestAt &&
        Date.now() - user.lastDeactivationRequestAt.getTime() < COOLDOWN_PERIOD;

      if (hasExceededRequests) {
        throw new AppError(
          "You have exceeded the maximum number of deactivation requests. Please try again after 48 hours.",
          400
        );
      }

      const canResetRequests =
        user.deactivationRequestCount >= MAX_DEACTIVATION_REQUESTS &&
        user.lastDeactivationRequestAt &&
        Date.now() - user.lastDeactivationRequestAt.getTime() > COOLDOWN_PERIOD;

      if (canResetRequests) {
        user.lastDeactivationRequestAt = undefined;
        user.deactivationRequestCount = 0;
        user.deactivationAccountToken = undefined;
        user.deactivationAccountTokenExpiredAt = undefined;
      }

      next();
    }
  );

  // validate deactivate account confirmation
  public validateDeactivateAccountConfirmation = catchAsync(
    async (
      req: Request<AccountStatusRequestParams>,
      res: Response,
      next: NextFunction
    ) => {
      const { token } = req.params;
      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          { attribute: "deactivationAccountToken", value: token },
          {
            attribute: "deactivationAccountTokenExpiredAt",
            value: new Date(),
            operator: "$gt",
          },
        ]);
      // check if the user is active or not
      if (!user) {
        throw new AppError("Invalid or expired deactivation token", 400);
      }

      // add the user to the request to be used in the service and controller
      req.user = user;

      next();
    }
  );

  // validate activation account confirmation
  public validateActivateAccount = catchAsync(
    async (
      req: Request<AccountStatusRequestParams>,
      res: Response,
      next: NextFunction
    ) => {
      const { token } = req.params;
      // get the user
      const user: IUser | null =
        await this.userAuthRepository.findUserWithCondition([
          { attribute: "reactivationAccountToken", value: token },
          {
            attribute: "reactivationAccountTokenExpiredAt",
            value: new Date(),
            operator: "$gt",
          },
        ]);
      // check if the user is active or not
      if (!user) {
        throw new AppError("Invalid or expired reactivation token", 400);
      }

      // add the user to the request to be used in the service and controller
      req.user = user;
      next();
    }
  );
}
