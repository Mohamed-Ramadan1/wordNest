// express imports.
import express, { Application, NextFunction, Request, Response } from "express";

// package imports.
import morgan from "morgan";
import path from "path";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

// routes imports from features
import { authRouter } from "@features/auth";
// import { userRouter, userAdminRouter } from "@features/users";
// import userRouter from "./features/users_feature/routes/user.routes";
import userAdminRouter from "./userFeatureRoutes/usersAdmin";
import userRouter from "./userFeatureRoutes/users";
import {
  supportTicketRouter,
  adminSupportTicketsRouter,
} from "@features/supportTickets";
import { favoritesRouter } from "@features/favorites";
import { readingListRouter } from "@features/readingList";
import { adminBlogRouter, blogOwnerRouter, blogRouter } from "@features/blogs";
import {
  interactionsRouter,
  interactionsAdminRouter,
} from "@features/interactions";

// error handling middleware
import { globalError } from "@shared/index";

// utils imports
import { AppError } from "@utils/index";

require("events").setMaxListeners(50);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});

// Initialize express app
const app: Application = express();

// setup logging middleware for requests.
app.use(morgan("dev"));

// Rate limiting
app.use(limiter);

// Compression
app.use(compression());

// Security headers
app.use(helmet());

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// NoSQL injection sanitization
app.use(mongoSanitize());

// HTTP parameter pollution protection
app.use(hpp());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

// user related routes
app.use("/api/v1/users", userRouter);

// admin user related routes
app.use("/api/v1/admin/users", userAdminRouter);

// Blog related routes for all users
app.use("/api/v1/blogs", blogRouter); // General routes for viewing blogs, commenting, liking, etc.

// Admin blog management routes
app.use("/api/v1/admin/blogs", adminBlogRouter); // Admin can create, edit, delete any blog, approve blogs

// Blog owner related routes
app.use("/api/v1/blog-owner/blogs", blogOwnerRouter); // Blog owner actions like create, edit, delete their own blogs

// support ticket related routes for users
app.use("/api/v1/support-tickets", supportTicketRouter);

// support ticket related routes for admins
app.use("/api/v1/admin/support-tickets", adminSupportTicketsRouter);

// interactions related routes
app.use("/api/v1/interactions", interactionsRouter);

// interactions related routes for admins
app.use("/api/v1/admin/interactions", interactionsAdminRouter);

// favorites related routes
app.use("/api/v1/favorites", favoritesRouter);

// reading list related routes
app.use("/api/v1/reading-list", readingListRouter);

// auth related routes
app.use("/api/v1/auth", authRouter);

// Error handling middleware
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalError);

export default app;
