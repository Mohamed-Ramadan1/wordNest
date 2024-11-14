import { Response } from "express";

export const sendResponse = <T>(
  statusCode: number,
  res: Response,
  response: T
): void => {
  res.status(statusCode).json(response);
};
