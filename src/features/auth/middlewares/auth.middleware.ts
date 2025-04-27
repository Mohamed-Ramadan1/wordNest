import { NextFunction, Request, Response } from "express";

// packages imports
import { inject, injectable } from "inversify";

// Models imports
import { IUser } from "@features/users";

// shard imports
import { catchAsync, validateDto, TYPES, IErrorUtils } from "@shared/index";

// dto imports
import { RegistrationDto } from "../dtos/registration.dto";
import { LoginDTO } from "../dtos/login.dto";

// interfaces imports
import { IAuthMiddleware } from "../interfaces/index";

import {
  checkAccountDeletionStatus,
  checkAccountLockStatus,
  handleInactiveAccount,
  checkAccountLoginLockedStatus,
  lockAccountLogin,
} from "../helper/accountValidation.helper";

// Logger imports
import { IAuthLogger } from "@logging/interfaces";
import { IUserAuthRepository } from "@features/users/interfaces";

// const authLogger = new AuthLogger();

@injectable()
export class AuthMiddleware implements IAuthMiddleware {
  constructor(
    @inject(TYPES.AuthLogger) private readonly authLogger: IAuthLogger,
    @inject(TYPES.UserAuthRepository)
    private readonly userAuthRepository: IUserAuthRepository,
    @inject(TYPES.ErrorUtils) private readonly errorUtils: IErrorUtils
  ) {}
  public validateRegistration = [
    validateDto(RegistrationDto), // Step 1: Validate inputs using DTO
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;

      const existingUser: IUser | null =
        await this.userAuthRepository.findUserByEmail(email);

      if (existingUser) {
        return this.errorUtils.handleAppError("Email already in use.", 409);
      }

      next();
    }),
  ];

  public validateLogin = [
    validateDto(LoginDTO),
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const user: IUser | null =
        await this.userAuthRepository.findUserByEmailAndSelectFields(email, [
          "+password",
        ]);

      // If no user is found, log and throw an error
      if (!user) {
        this.authLogger.logFailedLogin(
          email,
          req.ip,
          `No user existing with email address ${email}`
        ); // Log failed login attempt

        return this.errorUtils.handleAppError("Invalid email or password", 401);
      }
      // Call checkAccountLoginLockedStatus only once before any other checks
      await checkAccountLoginLockedStatus(user);

      // Validate password
      const isPasswordValid = await user.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        // Increment login attempts and potentially lock the account
        await lockAccountLogin(user);
        this.authLogger.logFailedLogin(email, req.ip, "Invalid credentials"); // Log failed login attempt
        return this.errorUtils.handleAppError("Invalid email or password", 401);
      }
      // Check account deletion status (if account marked for deletion)
      checkAccountDeletionStatus(user);

      // Check account lock status
      checkAccountLockStatus(user);

      // Handle inactive account
      await handleInactiveAccount(user);

      req.user = user;

      next();
    }),
  ];
}
