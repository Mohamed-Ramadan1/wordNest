import { Request, Response, NextFunction } from "express";

// Shard imports
import { AppError } from "@shared/index";

// interfaces imports
import { Roles } from "@features/users/interfaces/user.interface";
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ensure user and roles are defined
    if (!req.user || !Array.isArray(req.user.roles)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    // Check if the user has at least one of the required roles
    const userHasRole = req.user.roles.some((role: Roles) =>
      roles.includes(role)
    );

    if (!userHasRole) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
