export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}
