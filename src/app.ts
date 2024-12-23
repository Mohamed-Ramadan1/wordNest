import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
// routes imports
import { userRouter, userAdminRouter } from "@features/users";
import { authRouter } from "@features/auth";
import { globalError } from "@shared/index";
import { AppError } from "@utils/index";

const app: Application = express();

app.use(morgan("dev"));

app.use(express.json());
//serving static files
app.use(express.static(path.join(__dirname, "public")));
// setup security and other related middlewares
// auth related routes
app.use("/api/v1/auth", authRouter);

// user related routes
app.use("/api/v1/users", userRouter);

// admin user related routes
app.use("/api/v1/admin/users", userAdminRouter);

// Error handling middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalError);

export default app;
