import express, { Application, NextFunction, Request, Response } from "express";

// routes imports
import { userRouter, userAdminRouter } from "@features/users";
import globalError from "@errors/controller/error.Controller";
import AppError from "@utils/appError";

const app: Application = express();
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

// Error handling middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalError);

export default app;
