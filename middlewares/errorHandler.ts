// errorHandlerMiddleware.ts

import { Request, Response, NextFunction } from "express";

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof ErrorHandler) {
    const statusCode: number = +(error.statusCode || 500);
    return res
      .status(statusCode)
      .json({ success: false, message: error.message });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};

class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
