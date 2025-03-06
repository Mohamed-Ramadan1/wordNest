import { NextFunction, Response, Request } from "express";
import { AppError } from "@shared/index";

// A custom error interface
interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  path?: string;
  value?: string;
  keyValue?: { [key: string]: string };
  errors?: { [key: string]: { message: string } };
  code?: number | string;
}

const handleCastErrorDB = (err: CustomError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: CustomError) => {
  const value = Object.values(err.keyValue!)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: CustomError) => {
  const errors = Object.values(err.errors!).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError("Invalid token. Please log in again", 401);
};

const handleMulterLimitError = () => {
  // the error indicates that more files than the expected number of files uplaoly
  return new AppError(
    "Too many files.Not expecting this number of files ",
    400
  );
};
const handleJWTExpiredError = () => {
  return new AppError("Your token has expired. Please log in again", 401);
};

const sendErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: CustomError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode!).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const globalError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
    if (err.name === "MulterError" && err.code === "LIMIT_UNEXPECTED_FILE")
      err = handleMulterLimitError();
    sendErrorProd(err, res);
  }
};
