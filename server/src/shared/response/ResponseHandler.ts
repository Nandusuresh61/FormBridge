import { Response } from "express";

export class ResponseHandler {
  static success<T>(
    res: Response,
    {
      statusCode,
      message,
      data,
    }: {
      statusCode: number;
      message: string;
      data?: T;
    }
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}