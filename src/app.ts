// express imports.
import express, { Application, NextFunction, Request, Response } from "express";

// package imports.
import morgan from "morgan";
import path from "path";

// routes imports from features
import { authRouter } from "@features/auth";
import { userRouter, userAdminRouter } from "@features/users";
import {
  supportTicketRouter,
  adminSupportTicketsRouter,
} from "@features/supportTickets";

// error handling middleware
import { globalError } from "@shared/index";

// utils imports
import { AppError } from "@utils/index";
require("events").setMaxListeners(20);

// Initialize express app
const app: Application = express();

// setup logging middleware for requests.
app.use(morgan("dev"));

// setup body parser middleware(parse incoming request bodies)
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

// support ticket related routes for users
app.use("/api/v1/support-tickets", supportTicketRouter);

// support ticket related routes for admins
app.use("/api/v1/admin/support-tickets", adminSupportTicketsRouter);

// Error handling middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalError);

export default app;
