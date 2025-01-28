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
import { createSocket } from "@config/socketIO.config";
import { createServer, Server as HttpServer } from "http"; // Import createServer from http

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});

// Initialize express app
const app: Application = express();
// Create HTTP server
const server: HttpServer = createServer(app);

// Initialize Socket.IO using the reusable function
const io = createSocket(server);

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

export default server;
