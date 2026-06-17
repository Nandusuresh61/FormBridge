import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../../shared/errors/AppError";
import { HttpStatusCode } from "../../shared/enums/StatusCode";
import { ErrorCode } from "../../shared/enums/ErrorCode";
import { AppMessages } from "../../shared/messages/AppMessages";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {

  if (error instanceof ZodError) {
    return res.status(
      HttpStatusCode.BAD_REQUEST
    ).json({
      success: false,
      errorCode: ErrorCode.VALIDATION_ERROR,
      message: "Validation failed",
      errors: error.flatten(),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(
    HttpStatusCode.INTERNAL_SERVER_ERROR
  ).json({
    success: false,
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
    message: AppMessages.SOMETHING_WENT_WRONG,
  });
};